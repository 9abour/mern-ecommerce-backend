import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/user.model";
import { IUser } from "../../types/user.types";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import checkUserPassword from "./helpers/checkUserPassword";

const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	const user: IUser | null = await UserModel.findOne({ email });

	// No User found
	if (!user) {
		return handleSendResponse(
			res,
			null,
			["The user not exists!"],
			404,
			STATUS_TEXT.NOT_FOUND
		);
	}

	await checkUserPassword(password, user.password, () =>
		handleSendResponse(
			res,
			null,
			["The password do not match!"],
			404,
			STATUS_TEXT.NOT_FOUND
		)
	);

	// Login the user
	handleSendResponse(res, { user }, null, 200, STATUS_TEXT.SUCCESSFUL);
};

export default login;
