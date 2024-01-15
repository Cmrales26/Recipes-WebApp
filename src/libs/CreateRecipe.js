import { json } from "express";
import { pool } from "../db/db.js";

export const registerRecipe = async (Titulo, tiempo, descripcion) => {
  try {
    const RecipeRegister = await pool.query(
      "INSERT INTO recetas (Titulo, Descripcion, Tiempo ) VALUES (?,?,?)",
      [Titulo, descripcion, tiempo]
    );
    return RecipeRegister[0].insertId;
  } catch (error) {
    return error;
  }
};

export const RegisterRecipeStuff = async (data, id) => {
  const _DATASTRING = JSON.stringify(data);
  try {
    const StuffRegister = await pool.query(
      "INSERT INTO ingredientes (id_receta,ingredientes) VALUES (?,?)",
      [id, _DATASTRING]
    );
    return StuffRegister[0];
  } catch (error) {
    return error;
  }
};

export const RegisterRecipeSteps = async (data, id) => {
  const _DATASTRING = JSON.stringify(data);
  try {
    const StepsRegiter = await pool.query(
      "INSERT INTO pasos (id_receta, instrucciones) VALUES (?,?)",
      [id, _DATASTRING]
    );
    return StepsRegiter[0];
  } catch (error) {
    return error;
  }
};

export const RegisterRecipeNutData = async (data, id) => {
  const _DATASTRING = JSON.stringify(data);
  try {
    const NutDataRigister = await pool.query(
      "INSERT INTO informacion_nutricional (id_receta, nutrientes) VALUES (?,?)",
      [id, _DATASTRING]
    );
    return NutDataRigister[0];
  } catch (error) {
    return error;
  }
};

export const RegisterRecipeCategories = async (data, id) => {
  try {
    for (let i = 0; i < data.length; i++) {
      const element = data[i].id_categoria;
      console.log(element);
      const CategorieRegister = await pool.query(
        "INSERT INTO recetas_categorias (id_receta, id_categoria) VALUES (?,?)",
        [id, element]
      );
    }
    return true;
  } catch (error) {
    return error;
  }
};
