import { check } from "express-validator";
import handleExpressValidatorErrors from "../helpers/express/handleExpressValidatorError";

const categoryCreationValidateInput = [
	check("name").notEmpty().withMessage("Category name is required."),
	check("imageUrl")
		.notEmpty()
		.withMessage("Category image is required.")
		.isURL()
		.withMessage("Please provide a valid URL"),
	handleExpressValidatorErrors,
];

export { categoryCreationValidateInput };
