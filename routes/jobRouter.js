import { Router } from "express";
const router = Router();
import {
	getAllJobs,
	getSingleJob,
	createJob,
	updateJob,
	deleteJob,
	showStats,
} from "../controllers/jobController.js";

import {
	validateJobInput,
	validateIdParams,
} from "../middlewares/ValidationMiddleware.js";
import { checkForTestUser } from "../middlewares/authMiddleware.js";

router
	.route("/")
	.get(getAllJobs)
	.post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
	.route("/:id")
	.get(validateIdParams, getSingleJob)
	.patch(checkForTestUser, validateJobInput, validateIdParams, updateJob)
	.delete(checkForTestUser, validateIdParams, deleteJob);

export default router;
