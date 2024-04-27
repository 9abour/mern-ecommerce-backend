import { NextFunction, Response } from "express";
import { PrivateRequestType } from "../../types/customExpress.types";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import CategoryModel from "../../models/category.model";
import { generateSlugFromText } from "./helpers/generateSlugFromText";

const createCategory = async (
	req: PrivateRequestType,
	res: Response,
	next: NextFunction
) => {
	const { name, imageUrl, color } = req.body;

	const slug = generateSlugFromText(name);

	const newCategory = {
		name,
		imageUrl,
		color,
		slug,
	};

	const category = new CategoryModel(newCategory);
	category.save();

	handleSendResponse(
		res,
		{ msg: "The category has been created successfully.", category },
		null,
		201,
		STATUS_TEXT.SUCCESSFUL
	);
};

export default createCategory;
