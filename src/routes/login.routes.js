import { Router } from "express";
import {
  createuser,
  loginuser,
  logout,
  validationtoken,
} from "../controllers/login.controller.js";
import { validationSchema } from "../middleware/ValidationSchema.js";
import { loginScheme, registerSchema } from "../schemas/login.schema.js";
const router = Router();

router.route("/signin").post(validationSchema(loginScheme), loginuser);
router.route("/signup").post(validationSchema(registerSchema), createuser);
router.route("/logout").post(logout);
router.route("/tokenCheck").get(validationtoken);

export default router;
