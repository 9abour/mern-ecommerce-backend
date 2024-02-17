import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/user.model";
import { IUser } from "../../types/user.types";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import checkUserPassword from "./helpers/checkUserPassword";
import generateRefreshToken from "./helpers/generateRefreshToken";
import generateAccessToken from "./helpers/generateAccessToken";
import getUser from "./helpers/getUser";

const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	const user: IUser | null = await getUser(email);

	// No User found
	if (!user) {
		return handleSendResponse(
			res,
			null,
			["The user not exists!"],
			404,
			STATUS_TEXT.NOT_FOUND,
			next
		);
	}

	// Check Password
	await checkUserPassword(password, user.password, () =>
		next(
			handleSendResponse(
				res,
				null,
				["The password do not match!"],
				404,
				STATUS_TEXT.NOT_FOUND,
				next
			)
		)
	);

	const refreshToken = generateRefreshToken(user);
	const accessToken = generateAccessToken(refreshToken);

	handleSendResponse(
		res,
		{ refreshToken, accessToken },
		null,
		200,
		STATUS_TEXT.SUCCESSFUL
	);
};

export default login;
