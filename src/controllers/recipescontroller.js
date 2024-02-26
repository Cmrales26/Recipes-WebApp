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

export const getFavRecipe = async (req, res) => {
  try {
    const [row] = await pool.query(
      "SELECT recetas.id_receta, recetas.Titulo, AVG(user_score.calificacion) AS promedio from recetas join user_score on recetas.id_receta = user_score._id_receta group by recetas.id_receta, recetas.Titulo order by promedio desc limit 6;"
    );
    for (let i = 0; i < row.length; i++) {
      row[
        i
      ].ImagenURL = `http://localhost:5500/Recipes/${row[i].id_receta}.webp`;
    }
    return res.status(200).json(row);
  } catch (error) {
    return res
      .status(404)
      .json({ message: "error al consultar recetas favoritas" });
  }
};

export const getRecipy = async (req, res) => {
  const id_receta = req.params.id_receta;
  try {
    const [receta] = await pool.query(
      "SELECT recetas.*, ingredientes.ingredientes, pasos.instrucciones, informacion_nutricional.nutrientes,  (SELECT AVG(user_score.calificacion) FROM user_score WHERE user_score._id_receta = recetas.id_receta) as Promedio_Calificacion FROM recetas JOIN ingredientes ON recetas.id_receta = ingredientes.id_receta JOIN pasos ON recetas.id_receta = pasos.id_receta JOIN informacion_nutricional ON recetas.id_receta = informacion_nutricional.id_receta WHERE recetas.id_receta = ?",
      [id_receta]
    );

    if (receta[0] === undefined) {
      return res.status(404).json({ massage: "Recipe not Found" });
    }

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

export const setUserScore = async (req, res) => {
  try {
    const { username, recipe_id, calificacion, comentario } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO user_score (_username, _id_receta, calificacion, comentario) VALUES (?,?,?,?)",
      [username, recipe_id, calificacion, comentario]
    );
    res
      .status(200)
      .json({ message: "Reseña Agregada con exito", id: rows.insertId });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

export const getUserScore = async (req, res) => {
  try {
    const { username, recipe_id } = req.body;
    const [rows] = await pool.query(
      "select id, calificacion, comentario from user_score where _username = ? AND _id_receta = ?",
      [username, recipe_id]
    );
    if (rows[0] !== undefined) {
      rows[0].type = true;
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json({ calificacion: 0, type: false, comentario: "" });
    }
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

export const updateUserScore = async (req, res) => {
  try {
    const { calificacion, comentario, id } = req.body;
    const [rows] = await pool.query(
      "UPDATE user_score SET calificacion = IFNULL(?, calificacion), comentario = IFNULL(?, comentario) WHERE id = ?",
      [calificacion, comentario, id]
    );
    console.log(rows);
    return res.status(200).json("Reseña actualizada con exito");
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { username, recipe_id } = req.body;

    if (username !== null) {
      const [rows] = await pool.query(
        "SELECT users.name, users.lastname, user_score.calificacion, user_score.comentario  from user_score  join users on user_score._username = users.username where user_score._id_receta = ? AND user_score._username != ? ",
        [recipe_id, username]
      );
      res.status(200).json(rows);
    } else {
      const [rows] = await pool.query(
        "SELECT users.name, users.lastname, user_score.calificacion, user_score.comentario  from user_score  join users on user_score._username = users.username where user_score._id_receta = ?",
        [recipe_id]
      );
      res.status(200).json(rows);
    }
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
