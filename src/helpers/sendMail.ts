import { NextFunction, Response } from "express";
import { ISendMailOptions } from "./../types/sendMail.types";
import nodemailer from "nodemailer";
import handleSendResponse from "./handleSendResponse";
import { STATUS_TEXT } from "../enums/statusTexts.enums";

const sendMail = (
	mailOptions: ISendMailOptions,
	res: Response,
	next: NextFunction,
	callback: Function
) => {
	const transport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.TRANSPORTER_EMAIL,
			pass: process.env.TRANSPORTER_PASSWORD,
		},
	});

	transport.sendMail(mailOptions, async err => {
		if (err)
			return handleSendResponse(
				res,
				null,
				[err.message],
				400,
				STATUS_TEXT.ERROR,
				next
			);

		callback();
	});
};

export default sendMail;
