import { pool } from "../db/db.js";

export const getRecipes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT r.*, ROUND(AVG(us.calificacion),1) AS promedio_calificaciones FROM recetas r LEFT JOIN user_score us ON r.id_receta = us._id_receta GROUP BY r.id_receta"
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const getRecipy = async (req, res) => {
  const id_receta = req.params.id_receta;
  try {
    const [receta] = await pool.query(
      "SELECT r.id_receta, r.ImagenURL, r.Titulo, r.Instrucciones, r.Ingredientes, r.Tiempo, r.InfoNutricional, ROUND(AVG(us.calificacion), 1) AS promedio_calificaciones FROM recetas r LEFT JOIN user_score us ON r.id_receta = us._id_receta WHERE id_receta = ? GROUP BY r.id_receta, r.ImagenURL, r.Titulo, r.Instrucciones, r.Ingredientes, r.Tiempo, r.InfoNutricional",
      [id_receta]
    );

    const [categorias] = await pool.query(
      "SELECT c.nombre_categoria FROM Recetas_Categorias rc JOIN categorias c on rc.id_categoria = c.id_categoria WHERE rc.id_receta = ? ",
      [id_receta]
    );

    return res.status(200).json({ receta, categorias });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
