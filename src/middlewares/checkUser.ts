import HandleTokenHelper from "../controllers/auth/helpers/handleToken.helper";
import { STATUS_TEXT } from "../enums/statusTexts.enums";
import handleSendResponse from "../helpers/handleSendResponse";
import { IPrivateRequest } from "./../types/customExpress.types";
import { Response, NextFunction } from "express";

const checkUser = (req: IPrivateRequest, res: Response, next: NextFunction) => {
	try {
		const accessToken = HandleTokenHelper.getAuthToken(req);

		if (!accessToken) return next();

		const user = HandleTokenHelper.getUserInfo(accessToken, res, next);

		if (!user) {
			return next(
				handleSendResponse(
					res,
					null,
					["Invalid token!"],
					400,
					STATUS_TEXT.ERROR
				)
			);
		}

		req.user = user;
		next();
	} catch (error) {
		return next(error);
	}
};

export default checkUser;
