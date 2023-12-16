import { Router } from "express";
import { getRecipes, getRecipy } from "../controllers/recipescontroller.js";

const router = Router();

router.route("/recipes").get(getRecipes);
router.route("/recipes/:id_receta").get(getRecipy);

export default router;
