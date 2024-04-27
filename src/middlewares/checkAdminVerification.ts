import { NextFunction, Response } from "express";
import { PrivateRequestType } from "../types/customExpress.types";
import { ROLES } from "../enums/roles.enums";
import handleSendResponse from "../helpers/handleSendResponse";
import { STATUS_TEXT } from "../enums/statusTexts.enums";

const checkAdminVerification = (
	req: PrivateRequestType,
	res: Response,
	next: NextFunction
) => {
	try {
		const { user } = req;

		if (user?.role !== ROLES.ADMIN) {
			return next(
				handleSendResponse(
					res,
					null,
					["You can't create category with this role."],
					405,
					STATUS_TEXT.ERROR
				)
			);
		}

		next();
	} catch (error) {
		return next(error);
	}
};

export default checkAdminVerification;
