import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Middleware to verify admin role
export const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, username, firstname, lastname, role FROM users ORDER BY id ASC"
    );

    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const [users] = await pool.query(
      "SELECT id, username, firstname, lastname, role FROM users WHERE id = ?",
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: users[0],
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

// Update user (Admin only)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, firstname, lastname, role, password } = req.body;

    if (!username || !firstname || !lastname || !role) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check if username already exists (excluding current user)
    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE username = ? AND id != ?",
      [username, id]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Username already in use",
      });
    }

    let updateQuery = "UPDATE users SET username = ?, firstname = ?, lastname = ?, role = ?";
    let queryParams = [username, firstname, lastname, role];

    // If password is provided, hash it and update
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateQuery += ", password = ?";
      queryParams.push(hashedPassword);
    }

    updateQuery += " WHERE id = ?";
    queryParams.push(id);

    const [result] = await pool.query(updateQuery, queryParams);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting own account
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET);
      if (decoded.id === parseInt(id)) {
        return res.status(400).json({
          success: false,
          message: "You cannot delete your own account",
        });
      }
    }

    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

