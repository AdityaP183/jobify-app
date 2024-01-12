import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import User from "../models/UserModel.js";
import { UnAuthenticated } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

//* POST to register
export const registerUser = async (req, res) => {
	//? Assigning the role of admin
	const isFirstUser = (await User.countDocuments()) === 0;
	req.body.role = isFirstUser ? "admin" : "user";

	//? hashing password
	const hashedPassword = await hashPassword(req.body.password);
	req.body.password = hashedPassword;

	const user = await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ msg: "User created successfully" });
};

//* POST to login
export const loginUser = async (req, res) => {
	//? checking email
	const user = await User.findOne({ email: req.body.email });
	if (!user) throw new UnAuthenticated("invalid credentials");

	//? checking password
	const isPasswordCorrect = await comparePassword(
		req.body.password,
		user.password
	);
	if (!isPasswordCorrect) throw new UnAuthenticated("invalid credentials");

	const token = createJWT({ userId: user._id, role: user.role });
	const oneDay = 1000 * 60 * 60 * 24;

	res.cookie("passwordtoken18", token, {
		httpOnly: true,
		expires: new Date(Date.now() + oneDay),
		secure: process.env.NODE_ENV === "production",
	});
	res.status(StatusCodes.OK).json({ msg: "Logged in successful" });
};

//* Logout
export const logoutUser = (req, res) => {
	res.cookie("passwordtoken18", "logout", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.status(StatusCodes.OK).json({ msg: "Logged out successful" });
};
