import bcrypt from "bcrypt";
import { NextFunction } from "express";
const checkUserPassword = async (
	planPassword: string,
	hash: string,
	callback: any
) => {
	const passwordMatch = await bcrypt.compare(planPassword, hash);

	if (!passwordMatch) {
		return callback();
	}
};

export default checkUserPassword;
