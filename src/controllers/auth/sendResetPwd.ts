import { NextFunction, Request, Response } from "express";
import { ISendMailOptions } from "../../types/sendMail.types";
import userModel from "../../models/user.model";
import sendMail from "../../helpers/sendMail";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import ResetPasswordHelper from "./helpers/resetPassword.helper";
import sendResetPasswordMail from "../../helpers/sendResetPasswordMail";

const sendResetPwd = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email } = req.body;

	const token = await ResetPasswordHelper.generateResetPasswordToken(
		email,
		res,
		next
	);

	await userModel.updateOne({ email }, { resetPassword: token });

	sendResetPasswordMail(res, email, token, next);
};

export default sendResetPwd;
