import { Request, Response } from "express";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import UserModel from "../../models/user.model";

const verifyAccount = async (req: Request, res: Response) => {
	const { token } = req.params;

	const { modifiedCount } = await UserModel.updateOne(
		{ verificationToken: token },
		{
			$set: { verified: true },
			$unset: { verificationToken: 1 },
		}
	);

	if (!modifiedCount) {
		return handleSendResponse(
			res,
			null,
			["Invalid token"],
			404,
			STATUS_TEXT.ERROR
		);
	}

	handleSendResponse(
		res,
		{ msg: "Your account has been verified." },
		null,
		200,
		STATUS_TEXT.SUCCESSFUL
	);
};

export default verifyAccount;
