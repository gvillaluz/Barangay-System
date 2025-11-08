import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(404).json({
            success: false,
            message: "Invald username or password."
        }) 

    const [result] = await pool.query("SELECT * FROM users WHERE username = ?", [username])

    if (result.length === 0) return res.status(401).json({
        success: false,
        message: "User not found."
    })

    const user = result[0];

    if (!await bcrypt.compare(password, user.password)) return res.status(401).json({
        success: false,
        message: "Invalid password."
    })

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
    )

    return res.status(201).json({
        success: true, 
        message: "Login successful.",
        token
    })
}

export const registerUser = async (req, res) => {
  const { username, firstname, lastname, password, role } = req.body;

  if (!username || !firstname || !lastname || !password || !role) {
    return res.status(401).json({
      success: false,
      message: "Incomplete data."
    });
  }

  const [result] = await pool.query(
    "SELECT EXISTS(SELECT 1 FROM users WHERE username = ?) AS userExists",
    [username]
  );

  if (result[0].userExists === 1) {
    return res.status(409).json({
      success: false,
      message: "Username already in use."
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [insertResult] = await pool.query(
    "INSERT INTO users (username, firstname, lastname, password, role) VALUES (?, ?, ?, ?, ?)",
    [username, firstname, lastname, hashedPassword, role]
  );

  console.log("Insert Result:", insertResult);

   if (!insertResult || insertResult.affectedRows !== 1) {
      console.error("Insert failed:", insertResult);
      return res.status(500).json({
        success: false,
        message: "Registration failed."
      });
    }

    return res.status(201).json({
      success: true,
      message: "Registration successful."
    });
};
