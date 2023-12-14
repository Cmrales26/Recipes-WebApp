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
