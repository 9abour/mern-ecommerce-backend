import { NextFunction, Response } from "express";
import getUser from "./getUser";
import jwt from "jsonwebtoken";

const generateResetPasswordToken = async (
	email: string,
	res: Response,
	next: NextFunction
) => {
	const secretKey: string = process.env.JWT_SECRET_KEY || "";
	const options = {
		expiresIn: "5m",
	};

	await getUser(email, res, next);

	const token = jwt.sign({ email }, secretKey, options);

	return token;
};

export default generateResetPasswordToken;
