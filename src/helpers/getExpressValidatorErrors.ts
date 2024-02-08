import { Request } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

/**
 * Get validation errors from Express Validator middleware.
 * @param {Request} req The Express request object.
 * @returns {string[]} An array of error messages.
 */

const getExpressValidatorErrors = (req: Request): string[] | null => {
  const validatorErrors: Result<ValidationError> = validationResult(req);
  const errors: string[] = [];

  validatorErrors["errors"].map((error: ValidationError) => {
    errors.push(error.msg);
  });

  return errors.length ? errors : null;
};

export default getExpressValidatorErrors;
