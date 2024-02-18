import { NextFunction, Request, Response } from "express";
import { IUser } from "../../types/user.types";
import crypto from "crypto";
import sendVerificationTokenMail from "../../helpers/sendVerificationTokenMail";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import userModel from "../../models/user.model";

const register = async (req: Request, res: Response, next: NextFunction) => {
	const { firstName, lastName, email, password }: IUser = req.body;
	const user = await userModel.findOne({ email });

	if (user) {
		return handleSendResponse(
			res,
			null,
			["The user already exists."],
			409,
			STATUS_TEXT.ERROR,
			next
		);
	}

	const verificationToken = crypto.randomBytes(20).toString("hex");

	const newUser = { firstName, lastName, email, password, verificationToken };

	await sendVerificationTokenMail(res, newUser, verificationToken, next);
};

export default register;
