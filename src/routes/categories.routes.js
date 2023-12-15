import { Router } from "express";
import { getCategories } from "../controllers/categoriescontrollers.js";

const router = Router();

router.route("/categories").get(getCategories);

export default router;
