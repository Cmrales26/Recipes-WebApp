import { pool } from "../db/db.js";
import {
  RegisterRecipeCategories,
  RegisterRecipeNutData,
  RegisterRecipeSteps,
  RegisterRecipeStuff,
  registerRecipe,
} from "../libs/CreateRecipe.js";

import { fs } from "file-system";
import multer from "multer";
import sharp from "sharp";
import path from "path";

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

    console.log(data);

    res.status(200).json(res_registerRecipeId);
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Recipes");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

export const uploadRecipe = multer({ storage: multer.memoryStorage() });

export const uploadRecipeImg = async (req, res) => {
  const data = req.body;
  console.log(data);
  sharp(req.file.buffer)
    .webp()
    .toBuffer()
    .then((buffer) => {
      req.file.buffer = buffer;
      req.file.mimetype = "image/webp";
      const filename = path.parse(req.file.originalname).name + ".webp";
      fs.writeFile(`./public/Recipes/${filename}`, buffer, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "Error al guardar la imagen" });
        } else {
          res.status(200).json({
            message: "Imagen subida y convertida a WebP exitosamente",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error al convertir la imagen a WebP" });
    });
};
