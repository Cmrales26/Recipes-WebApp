import { Router } from "express";
import {
  getRecipes,
  getRecipy,
  createRecipe,
  uploadRecipe,
  uploadRecipeImg,
} from "../controllers/recipescontroller.js";

const router = Router();

router.route("/create/recipe").post(createRecipe);

router.route("/recipes").get(getRecipes);
router.route("/recipes/:id_receta").get(getRecipy);

router
  .route("/uploadimageRecipe")
  .post(uploadRecipe.single("file"), uploadRecipeImg);

export default router;
