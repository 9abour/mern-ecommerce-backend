import { NextFunction, Request, Response } from "express";
import { generateSlugFromText } from "../controllers/categories/helpers/generateSlugFromText";
import productModel from "../models/product.model";
import handleSendResponse from "../helpers/handleSendResponse";
import { STATUS_TEXT } from "../enums/statusTexts.enums";

const checkDuplicateProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name } = req.body;

	const slug = generateSlugFromText(name);

	const existingCategory = await productModel.findOne({ slug });

	if (existingCategory) {
		return handleSendResponse(
			res,
			null,
			["The product already exists"],
			409,
			STATUS_TEXT.ERROR
		);
	}
	next();
};

export { checkDuplicateProduct };
