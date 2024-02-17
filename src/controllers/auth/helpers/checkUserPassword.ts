import bcrypt from "bcrypt";
import { NextFunction, Response } from "express";
import handleSendResponse from "../../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../../enums/statusTexts.enums";

const checkUserPassword = async (
	planPassword: string,
	hash: string,
	res: Response,
	next: NextFunction
) => {
	const passwordMatch = await bcrypt.compare(planPassword, hash);

	if (!passwordMatch) {
		return handleSendResponse(
			res,
			null,
			["The password do not match!"],
			404,
			STATUS_TEXT.NOT_FOUND,
			next
		);
	}
};

export default checkUserPassword;
