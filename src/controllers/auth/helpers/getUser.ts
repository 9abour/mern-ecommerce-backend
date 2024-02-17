import { NextFunction, Response } from "express";
import { STATUS_TEXT } from "../../../enums/statusTexts.enums";
import handleSendResponse from "../../../helpers/handleSendResponse";
import UserModel from "../../../models/user.model";
import { IUser } from "../../../types/user.types";

const getUser = async (
	email: string,
	res: Response,
	next: NextFunction
): Promise<IUser | any> => {
	const user: IUser | null = await UserModel.findOne({ email });

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

	return user;
};

export default getUser;
