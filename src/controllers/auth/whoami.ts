import { NextFunction, Request, Response } from "express";
import HandleTokenHelper from "./helpers/handleToken.helper";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";

const whoami = async (req: Request, res: Response, next: NextFunction) => {
	const { auth } = req.headers;

	if (!auth) {
		return handleSendResponse(
			res,
			null,
			["No token found!"],
			404,
			STATUS_TEXT.NOT_FOUND,
			next
		);
	}

	const accessToken = auth.toString();

	const user = HandleTokenHelper.getUserInfo(accessToken, res, next);

	handleSendResponse(res, { user }, null, 200, STATUS_TEXT.SUCCESSFUL, next);
};

export default whoami;
