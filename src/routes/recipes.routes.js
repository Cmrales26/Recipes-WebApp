import { Router } from "express";
import {
  getRecipes,
  getRecipy,
  createRecipe,
  uploadRecipe,
  uploadRecipeImg,
  getUserScore,
  setUserScore,
  updateUserScore,
  getReviews,
  getFavRecipe,
} from "../controllers/recipescontroller.js";

const router = Router();

router.route("/create/recipe").post(createRecipe);

router.route("/recipes").get(getRecipes);
router.route("/recipes/:id_receta").get(getRecipy);
router.route("/favrecipe").get(getFavRecipe);
router.route("/recipe/userScore").post(getUserScore);

router.route("/recipe/getReviews").post(getReviews);
router.route("/recipe/setReview").post(setUserScore);
router.route("/recipe/updateReview").patch(updateUserScore);

router
  .route("/uploadimageRecipe")
  .post(uploadRecipe.single("file"), uploadRecipeImg);

export default router;
