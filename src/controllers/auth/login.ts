import { NextFunction, Request, Response } from "express";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import checkUserPassword from "./helpers/checkUserPassword";
import getUser from "./helpers/getUser";
import HandleTokenHelper from "./helpers/handleToken.helper";
import { IUser } from "../../types/user.types";

const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	const user: IUser = await getUser(email, res, next);

	// Check Password
	await checkUserPassword(password, user.password, res, next);

	const refreshToken = HandleTokenHelper.generateRefreshToken(user);
	const accessToken = HandleTokenHelper.generateAccessToken(refreshToken);

	handleSendResponse(
		res,
		{ msg: "Welcome back 👋", refreshToken, accessToken },
		null,
		200,
		STATUS_TEXT.SUCCESSFUL
	);
};

export default login;
