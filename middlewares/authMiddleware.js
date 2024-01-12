import {
	BadRequest,
	UnAuthenticated,
	UnAuthorized,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
	const { passwordtoken18 } = req.cookies;
	if (!passwordtoken18) throw new UnAuthenticated("authentication invalid");
	try {
		const { userId, role } = verifyJWT(passwordtoken18);
		const testUser = userId === "6587fd0c296ac2f9958cf4da";
		req.user = { userId, role, testUser };
		next();
	} catch (error) {
		throw new UnAuthenticated("authentication invalid");
	}
};

export const authorizePermissions = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new UnAuthorized("Unauthorized to access");
		}
		next();
	};
};

export const checkForTestUser = (req, res, next) => {
	if(req.user.testUser) throw new BadRequest("Demo user. Read Only!");
	next();
};
