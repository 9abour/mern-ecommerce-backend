import { NextFunction, Response } from "express";
import handleSendResponse from "../../../helpers/handleSendResponse";
import { IUser } from "../../../types/user.types";
import { STATUS_TEXT } from "../../../enums/statusTexts.enums";
import jwt from "jsonwebtoken";
import ResetPasswordHelper from "./resetPassword.helper";

const handleResetPassword = (
	user: IUser | null,
	newPassword: string,
	res: Response,
	next: NextFunction
) => {
	if (!user || !user.resetPassword) {
		return handleSendResponse(
			res,
			null,
			!user ? ["The user not exists!"] : ["Regenerate password reset token!"],
			404,
			!user ? STATUS_TEXT.NOT_FOUND : STATUS_TEXT.ERROR,
			next
		);
	}

	const secretKey: string = process.env.JWT_SECRET_KEY || "";

	const decode = jwt.verify(user.resetPassword, secretKey);
	if (!decode) {
		return handleSendResponse(
			res,
			null,
			["The password reset token is invalid!"],
			404,
			STATUS_TEXT.ERROR,
			next
		);
	}

	ResetPasswordHelper.updatePassword(user.email, newPassword);
};

export default handleResetPassword;
