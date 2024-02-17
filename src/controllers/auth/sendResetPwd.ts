import { NextFunction, Request, Response } from "express";
import { ISendMailOptions } from "../../types/sendMail.types";
import userModel from "../../models/user.model";
import sendMail from "../../helpers/sendMail";
import handleSendResponse from "../../helpers/handleSendResponse";
import generateResetPasswordToken from "./helpers/generateResetPasswordToken";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";

const sendResetPwd = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email } = req.body;

	const token = await generateResetPasswordToken(email, res, next);

	await userModel.updateOne({ email }, { resetPassword: token });

	const verificationLink = `http://localhost:5000/reset/${token}`;

	const mailOptions: ISendMailOptions = {
		from: process.env.TRANSPORTER_EMAIL || "",
		to: email,
		subject: "Reset Your Account Password",
		text: `Please click on the following link to reset your password: ${verificationLink}`,
	};

	sendMail(mailOptions, res, next, () => {
		handleSendResponse(
			res,
			{ msg: "Check your email box!" },
			null,
			200,
			STATUS_TEXT.SUCCESSFUL
		);
	});
};

export default sendResetPwd;
