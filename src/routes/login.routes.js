import { Router } from "express";
import {
  changepassword,
  createuser,
  disableAccess,
  enableAccess,
  getDietary,
  getUser,
  loginuser,
  logout,
  removeDietaryCategory,
  saveuser_dietaty,
  sendPinvalidation,
  updateuser,
  validatePassword,
  validationtoken,
  verifyPinCode,
} from "../controllers/login.controller.js";
import { validationSchema } from "../middleware/ValidationSchema.js";
import {
  changepasswordschema,
  loginScheme,
  registerSchema,
} from "../schemas/login.schema.js";
import {
  removeProfilePhoto,
  upload,
  uploadProfilePhoto,
} from "../controllers/ProfilePhotoController.js";
const router = Router();

router.route("/signin").post(validationSchema(loginScheme), loginuser);
router.route("/signup").post(validationSchema(registerSchema), createuser);
router.route("/logout").post(logout);
router.route("/disable/:username").put(disableAccess);
router.route("/enable/:username").put(enableAccess);
router
  .route("/update/:username")
  .patch(validationSchema(loginScheme), updateuser);
router
  .route("/changepass/:username")
  .patch(validationSchema(changepasswordschema), changepassword);
router.route("/tokenCheck").get(validationtoken);
router.route("/SendVerificationPin/:username").post(sendPinvalidation);

router.route("/validatepass/:username").post(validatePassword);

// Dietario
router.route("/dietary/:username").post(saveuser_dietaty);
router.route("/dietary/:username").get(getDietary);
router.route("/dietary/:username").delete(removeDietaryCategory);

// ProfilePhoto
router.route("/removeProfilePhoto/:username").post(removeProfilePhoto);
router
  .route("/uploadProfilePhoto")
  .post(upload.single("file"), uploadProfilePhoto);

router.route("/getUserInfo").post(getUser);
router.route("/verifyPinCode").post(verifyPinCode);

export default router;
