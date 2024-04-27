import { NextFunction, Request, Response } from "express";
import productModel from "../../models/product.model";
import { generateSlugFromText } from "../categories/helpers/generateSlugFromText";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";

const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, price, count, description, categories, imageUrl } = req.body;

	const slug = generateSlugFromText(name);

	const productData = {
		slug,
		name,
		price,
		count,
		description,
		categories,
		imageUrl,
	};

	const newProduct = new productModel(productData);

	await newProduct.save();

	handleSendResponse(
		res,
		{ msg: "The product has been created successfully.", product: newProduct },
		null,
		201,
		STATUS_TEXT.SUCCESSFUL
	);
};

export { createProduct };
