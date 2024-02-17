import { check } from "express-validator";
import handleExpressValidatorErrors from "../helpers/handleExpressValidatorError";

const registerValidateInput = [
	check("firstName").notEmpty().withMessage("First Name is required."),
	check("lastName").notEmpty().withMessage("Last Name is required."),
	check("email")
		.isEmail()
		.withMessage("Should be an email.")
		.notEmpty()
		.withMessage("Email is required."),
	check("password")
		.notEmpty()
		.withMessage("password Name is required.")
		.isLength({ min: 8 })
		.withMessage("Password has to be more than 7 characters."),
	handleExpressValidatorErrors,
];

const loginValidateInput = [
	check("email").notEmpty().withMessage("Email is required."),
	check("password").notEmpty().withMessage("Password is required."),
	handleExpressValidatorErrors,
];

const sendResetPasswordValidateInput = [
	check("email").notEmpty().withMessage("Email is required."),
	handleExpressValidatorErrors,
];

const resetPasswordValidateInput = [
	check("newPassword")
		.notEmpty()
		.withMessage("Password is required.")
		.isLength({ min: 8 })
		.withMessage("Password has to be more than 7 characters."),
	handleExpressValidatorErrors,
];

export {
	registerValidateInput,
	loginValidateInput,
	sendResetPasswordValidateInput,
	resetPasswordValidateInput,
};
