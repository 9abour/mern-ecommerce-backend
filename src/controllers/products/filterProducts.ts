import { NextFunction, Request, Response } from "express";
import { getCategoryId } from "../../helpers/category/getCategoryId";
import productModel from "../../models/product.model";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";

const filterProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { category, available, rate, minPrice, maxPrice } = req.params;

	const categoryId = await getCategoryId(category);

	const filteredProducts = await productModel.find({
		count: available ? { $gt: 0 } : { $exists: true },
		price: { $gte: minPrice },
	});

	handleSendResponse(
		res,
		filteredProducts,
		null,
		200,
		STATUS_TEXT.SUCCESSFUL,
		next
	);
};

export { filterProducts };
