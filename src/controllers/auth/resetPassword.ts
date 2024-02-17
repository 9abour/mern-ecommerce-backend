import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import userModel from "../../models/user.model";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import jwt from "jsonwebtoken";
import { IUser } from "../../types/user.types";

const resetPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { token } = req.params;
	const { newPassword } = req.body;

	const user: IUser | null = await userModel.findOne({ resetPassword: token });

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
	const decoded: any = jwt.verify(user.resetPassword, secretKey);
	if (!decoded) {
		return handleSendResponse(
			res,
			null,
			["The password reset token is invalid!"],
			404,
			STATUS_TEXT.ERROR,
			next
		);
	}

	bcrypt.hash(newPassword, 10, async (err, hashed) => {
		await userModel.updateOne({
			email: decoded.email,
			$set: { password: hashed },
		});
	});

	handleSendResponse(
		res,
		{ msg: "Your password has been reset." },
		null,
		200,
		STATUS_TEXT.SUCCESSFUL
	);
};

export default resetPassword;
