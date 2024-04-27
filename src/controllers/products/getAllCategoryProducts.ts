import { NextFunction, Request, Response } from "express";
import productModel from "../../models/product.model";
import categoryModel from "../../models/category.model";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";

const getAllCategoryProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { category } = req.params;

	const categoryData = await categoryModel.findOne({ slug: category });

	if (!categoryData) {
		return handleSendResponse(
			res,
			null,
			["Category not found"],
			404,
			STATUS_TEXT.NOT_FOUND,
			next
		);
	}

	const categoryId = categoryData._id.toString();

	const products = await productModel.find({
		categories: categoryId,
	});

	handleSendResponse(res, products, null, 200, STATUS_TEXT.SUCCESSFUL, next);
};

export { getAllCategoryProducts };
