import bcrypt from "bcryptjs";

export const hashPassword = async (normalPassword) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(normalPassword, salt);
	return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch;
}