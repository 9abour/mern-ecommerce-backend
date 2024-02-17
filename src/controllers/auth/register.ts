import { NextFunction, Request, Response } from "express";
import { IUser } from "../../types/user.types";
import getUser from "./helpers/getUser";
import crypto from "crypto";
import sendVerificationTokenMail from "../../helpers/sendVerificationTokenMail";

const register = async (req: Request, res: Response, next: NextFunction) => {
	const { firstName, lastName, email, password }: IUser = req.body;

	await getUser(email, res, next);

	const verificationToken = crypto.randomBytes(20).toString("hex");

	const newUser = { firstName, lastName, email, password, verificationToken };

	await sendVerificationTokenMail(res, newUser, verificationToken, next);
};

export default register;
