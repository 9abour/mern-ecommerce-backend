import { NextFunction, Request, Response } from "express";
import userModel from "../../models/user.model";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import { IUser } from "../../types/user.types";
import handleResetPassword from "./helpers/handleResetPassword";

const resetPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { token } = req.params;
	const { newPassword } = req.body;

	const user: IUser | null = await userModel.findOne({ resetPassword: token });

	handleResetPassword(user, newPassword, res, next);

	handleSendResponse(
		res,
		{ msg: "Your password has been reset." },
		null,
		200,
		STATUS_TEXT.SUCCESSFUL
	);
};

export default resetPassword;
