import { NextFunction, Request, Response } from "express";
import HandleTokenHelper from "./helpers/handleToken.helper";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";

const refreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const auth = req.headers.authorization;

	if (!auth) {
		return;
	}

	const refreshToken = auth.split(" ")[1];

	const accessToken = HandleTokenHelper.generateAccessToken(refreshToken);

	handleSendResponse(
		res,
		{
			accessToken,
		},
		null,
		201,
		STATUS_TEXT.SUCCESSFUL
	);
};

export default refreshToken;
