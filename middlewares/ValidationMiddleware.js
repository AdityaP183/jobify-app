import { body, param, validationResult } from "express-validator";
import { BadRequest, NotFound, UnAuthorized } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/Constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
	return [
		validateValues,
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errorMsg = errors.array().map((err) => err.msg);
				if (errorMsg[0].startsWith("no job")) {
					throw new NotFound(errorMsg);
				}
				if (errorMsg[0].startsWith("not authorized")) {
					throw new UnAuthorized("not authorized to access");
				}
				throw new BadRequest(errorMsg);
			}
			next();
		},
	];
};

export const validateJobInput = withValidationErrors([
	[
		body("company").notEmpty().withMessage("company is required"),
		body("position").notEmpty().withMessage("position is required"),
		body("jobLocation").notEmpty().withMessage("job location is required"),
		body("jobStatus")
			.isIn(Object.values(JOB_STATUS))
			.withMessage("invalid status value"),
		body("jobType")
			.isIn(Object.values(JOB_TYPE))
			.withMessage("invalid type value"),
	],
]);

export const validateIdParams = withValidationErrors([
	param("id").custom(async (value, { req }) => {
		const isValidId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidId) throw new BadRequest("invalid MongoDB id");
		const job = await Job.findById(value);
		if (!job) throw new NotFound(`no job found with an id ${value}`);
		const isAdmin = req.user.role === "admin";
		const isOwner = req.user.userId === job.createdBy.toString();
		if (!isAdmin && !isOwner)
			throw new UnAuthorized("not authorized to access");
	}),
]);

export const validateUserRegister = withValidationErrors([
	body("name").notEmpty().withMessage("name is required!"),
	body("email")
		.notEmpty()
		.withMessage("email is required!")
		.isEmail()
		.withMessage("not a valid email format")
		.custom(async (email) => {
			const user = await User.findOne({ email });
			if (user) throw new BadRequest("email already exists");
		}),
	body("password")
		.notEmpty()
		.withMessage("password is required!")
		.isLength({ min: 8 })
		.withMessage("password should be aleast 8 characters long"),
	body("lastName").notEmpty().withMessage("lastName is required!"),
	body("location").notEmpty().withMessage("location is required!"),
]);

export const validateUserLogin = withValidationErrors([
	body("email")
		.notEmpty()
		.withMessage("email is required!")
		.isEmail()
		.withMessage("not a valid email format"),
	body("password").notEmpty().withMessage("password is required!"),
]);

export const validateAndUpdateUser = withValidationErrors([
	body("name").notEmpty().withMessage("name is required!"),
	body("email")
		.notEmpty()
		.withMessage("email is required!")
		.isEmail()
		.withMessage("not a valid email format")
		.custom(async (email, {req}) => {
			const user = await User.findOne({ email });
			if (user && user._id.toString() !== req.user.userId) {
				throw new BadRequest("email already exists");
			}
		}),
	body("lastName").notEmpty().withMessage("lastName is required!"),
	body("location").notEmpty().withMessage("location is required!"),
]);
