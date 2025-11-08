import pool from '../config/db.js'

export const findUserbyUsername = async (username) => {
    const [result] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

    return result;
}

export const insertUser = async (userData) => {
    const { username, firstname, lastname, password, role } = userData;

    const [insertResult] = await pool.query(
    "INSERT INTO users (username, firstname, lastname, password, role) VALUES (?, ?, ?, ?, ?)",
    [username, firstname, lastname, password, role]
  );

  return insertResult.affectedRows;
}

export const checkUsernameExists = async (username) => {
    const [result] = await pool.query(
    "SELECT EXISTS(SELECT 1 FROM users WHERE username = ?) AS userExists",
    [username]
  );

  return result;
}