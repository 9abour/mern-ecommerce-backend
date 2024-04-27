import { NextFunction, Request, Response } from "express";
import categoryModel from "../models/category.model";
import handleSendResponse from "../helpers/handleSendResponse";
import { STATUS_TEXT } from "../enums/statusTexts.enums";
import { generateSlugFromText } from "../controllers/categories/helpers/generateSlugFromText";

const checkDuplicateCategory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name } = req.body;

	const slug = generateSlugFromText(name);

	const existingCategory = await categoryModel.findOne({ slug });

	if (existingCategory) {
		return handleSendResponse(
			res,
			null,
			["The category already exists"],
			409,
			STATUS_TEXT.ERROR
		);
	}
	next();
};

export { checkDuplicateCategory };
