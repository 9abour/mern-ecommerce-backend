import { NextFunction, Request, Response } from "express";
import userModel from "../../models/user.model";
import ResetPasswordHelper from "./helpers/resetPassword.helper";
import sendResetPasswordMail from "../../helpers/auth/sendResetPasswordMail";

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
