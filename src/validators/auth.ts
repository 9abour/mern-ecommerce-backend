import { check } from "express-validator";
import handleExpressValidatorErrors from "../helpers/handleExpressValidatorError";

export const registerValidateInput = [
  check("firstName").notEmpty(),
  check("lastName").notEmpty(),
  check("email").isEmail().notEmpty(),
  check("password").notEmpty().isLength({ min: 8 }),
  handleExpressValidatorErrors,
];
