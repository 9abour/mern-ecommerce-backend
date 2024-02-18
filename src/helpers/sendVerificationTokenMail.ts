import { NextFunction, Response } from "express";
import handleSendResponse from "./handleSendResponse";
import { STATUS_TEXT } from "../enums/statusTexts.enums";
import saveUser from "../controllers/auth/helpers/saveUser";
import { INewUser } from "../types/user.types";
import sendMail from "./sendMail";
import generateVerifyEmailTemplate from "./generateVerifyEmailTemplate";

const sendVerificationTokenMail = async (
	res: Response,
	user: INewUser,
	verificationToken: string,
	next: NextFunction
) => {
	const verificationLink = `http://localhost:5000/verify/${verificationToken}`;

	const mailOptions = {
		from: process.env.TRANSPORTER_EMAIL || "",
		to: user.email,
		subject: "Verify Your Email Address",
		html: generateVerifyEmailTemplate(verificationLink),
	};

	sendMail(mailOptions, res, next, async () => {
		await saveUser(user);
		handleSendResponse(
			res,
			{ msg: "Please check your email for verification." },
			null,
			201,
			STATUS_TEXT.SUCCESSFUL
		);

		res.redirect("/login");
	});
};

export default sendVerificationTokenMail;
