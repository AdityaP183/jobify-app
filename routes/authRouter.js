import { Router } from "express";
const router = Router();

import { loginUser, registerUser, logoutUser } from "../controllers/authController.js";
import { validateUserLogin, validateUserRegister } from "../middlewares/ValidationMiddleware.js";

router.post("/login", validateUserLogin, loginUser);
router.post("/register", validateUserRegister, registerUser);
router.get("/logout", logoutUser);

export default router;
