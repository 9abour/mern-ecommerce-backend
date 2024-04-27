import { NextFunction, Response } from "express";
import handleSendResponse from "../handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import sendMail from "../sendMail";
import { ISendMailOptions } from "../../types/sendMail.types";
import generateResetPasswordTemplate from "./generateResetPasswordTemplate";

const sendResetPasswordMail = async (
	res: Response,
	email: string,
	token: string,
	next: NextFunction
) => {
	const resetPasswordLink = `http://localhost:3000/auth/reset-password/${token}`;

	const mailOptions: ISendMailOptions = {
		from: process.env.TRANSPORTER_EMAIL || "",
		to: email,
		subject: "Reset Your Account Password",
		html: generateResetPasswordTemplate(resetPasswordLink),
	};

	sendMail(mailOptions, res, next, () => {
		handleSendResponse(
			res,
			{ msg: "Check email box, it will expire after 5 minutes ✉️" },
			null,
			200,
			STATUS_TEXT.SUCCESSFUL
		);
	});
};

export default sendResetPasswordMail;
