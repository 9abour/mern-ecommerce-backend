import { NextFunction, Request, Response } from "express";
import productModel from "../../models/product.model";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import { getCategoryId } from "../../helpers/category/getCategoryId";

const getAllCategoryProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { category } = req.params;

	const categoryId = await getCategoryId(category);

	if (!categoryId) {
		return handleSendResponse(
			res,
			null,
			["Category not found"],
			404,
			STATUS_TEXT.NOT_FOUND,
			next
		);
	}

	const products = await productModel.find({
		categories: categoryId,
	});

	handleSendResponse(res, products, null, 200, STATUS_TEXT.SUCCESSFUL, next);
};

export { getAllCategoryProducts };
