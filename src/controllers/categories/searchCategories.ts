import { NextFunction, Request, Response } from "express";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import categoryModel from "../../models/category.model";

const searchCategories = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { p } = req.query;

	if (!p) {
		return handleSendResponse(
			res,
			null,
			["Invalid search parameter"],
			400,
			STATUS_TEXT.ERROR,
			next
		);
	}

	const categories = await categoryModel.find({
		name: { $regex: new RegExp(p.toString(), "i") },
	});

	if (!categories.length) {
		return handleSendResponse(
			res,
			null,
			["There is no categories found"],
			404,
			STATUS_TEXT.NOT_FOUND,
			next
		);
	}

	handleSendResponse(res, categories, null, 200, STATUS_TEXT.SUCCESSFUL, next);
};

export { searchCategories };
