import { pool } from "../db/db.js";
import {
  RegisterRecipeCategories,
  RegisterRecipeNutData,
  RegisterRecipeSteps,
  RegisterRecipeStuff,
  registerRecipe,
} from "../libs/CreateRecipe.js";

export const createRecipe = async (req, res) => {
  const data = req.body;
  const {
    Titulo,
    tiempo,
    descripcion,
    ingredientes,
    Pasos,
    NutInfo,
    categoriesSelected,
  } = data;
  try {
    const res_registerRecipeId = await registerRecipe(
      Titulo,
      tiempo,
      descripcion
    );

    const res_registerStuff = await RegisterRecipeStuff(
      ingredientes,
      res_registerRecipeId
    );

    const res_regiterSteps = await RegisterRecipeSteps(
      Pasos,
      res_registerRecipeId
    );

    const res_RegisterInfo = await RegisterRecipeNutData(
      NutInfo,
      res_registerRecipeId
    );

    const res_RegisterCat = await RegisterRecipeCategories(
      categoriesSelected,
      res_registerRecipeId
    );

    console.log(res_RegisterCat);

    res.status(200).json("Agregado");
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT r.*, ROUND(AVG(us.calificacion),1) AS promedio_calificaciones FROM recetas r LEFT JOIN user_score us ON r.id_receta = us._id_receta GROUP BY r.id_receta"
    );

    for (let i = 0; i < rows.length; i++) {
      rows[
        i
      ].ImagenURL = `http://localhost:5500/Recipes/${rows[i].id_receta}.webp`;
    }
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const getRecipy = async (req, res) => {
  const id_receta = req.params.id_receta;
  console.log(id_receta);
  try {
    const [receta] = await pool.query(
      "SELECT r.id_receta, r.ImagenURL, r.Titulo, r.Instrucciones, r.Ingredientes,r.descripcion, r.Tiempo, r.InfoNutricional, ROUND(AVG(us.calificacion), 1) AS promedio_calificaciones FROM recetas r LEFT JOIN user_score us ON r.id_receta = us._id_receta WHERE id_receta = ? GROUP BY r.id_receta, r.ImagenURL, r.Titulo, r.Instrucciones, r.Ingredientes, r.Tiempo, r.InfoNutricional",
      [id_receta]
    );

    const [categorias] = await pool.query(
      "SELECT c.nombre_categoria FROM Recetas_Categorias rc JOIN categorias c on rc.id_categoria = c.id_categoria WHERE rc.id_receta = ? ",
      [id_receta]
    );

    receta[0].ImagenURL = `http://localhost:5500/Recipes/${id_receta}.webp`;

    return res.status(200).json({ receta, categorias });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
