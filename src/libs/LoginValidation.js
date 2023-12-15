import { pool } from "../db/db.js";
import bcrypt from "bcrypt";

export const UserExists = async (username) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      username
    );
    if (result[0].length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return error.message;
  }
};

export const checkpass = async (username, password) => {
  try {
    const [rows] = await pool.query(
      "SELECT password FROM users WHERE username = ?",
      username
    );
    const validator = await bcrypt.compare(password, rows[0].password )
    return validator;
  } catch (error) {
    return error.message;
  }
};
