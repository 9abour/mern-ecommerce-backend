import { NextFunction, Response } from "express";
import handleSendResponse from "../../../helpers/handleSendResponse";
import { IUser } from "../../../types/user.types";
import { STATUS_TEXT } from "../../../enums/statusTexts.enums";
import ResetPasswordHelper from "./resetPassword.helper";
import HandleTokenHelper from "./handleToken.helper";

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

	HandleTokenHelper.checkToken(
		user.resetPassword,
		"The password reset token is invalid!",
		res,
		next
	);

	ResetPasswordHelper.updatePassword(user.email, newPassword);
};

export default handleResetPassword;
