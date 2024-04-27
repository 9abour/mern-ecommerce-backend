import { check } from "express-validator";
import handleExpressValidatorErrors from "../helpers/express/handleExpressValidatorError";

const productCreationValidateInput = [
	check("name").notEmpty().withMessage("Product name is required."),
	check("price")
		.notEmpty()
		.withMessage("Product price is required.")
		.isNumeric()
		.withMessage("Must be a number"),
	check("count")
		.notEmpty()
		.withMessage("Product stock count is required.")
		.isNumeric()
		.withMessage("Must be a number"),
	check("description")
		.notEmpty()
		.withMessage("Product description is required."),
	check("imageUrl")
		.notEmpty()
		.withMessage("Category image is required.")
		.isURL()
		.withMessage("Please provide a valid URL"),
	handleExpressValidatorErrors,
];

export { productCreationValidateInput };
