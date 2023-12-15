import { pool } from "../db/db.js";

export const getCategories = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM categorias");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
