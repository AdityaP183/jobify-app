import { Router } from "express";
const router = Router();
import {
	getApplicationStatus,
	getCurrentUser,
	updateUser,
} from "../controllers/userController.js";
import { validateAndUpdateUser } from "../middlewares/ValidationMiddleware.js";
import { authorizePermissions, checkForTestUser } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

router.get("/current-user", getCurrentUser);
router.get(
	"/admin/app-stats",
	authorizePermissions("admin"),
	getApplicationStatus
);
router.patch(
	"/update-user",
	checkForTestUser,
	upload.single("avatar"),
	validateAndUpdateUser,
	updateUser
);

export default router;
