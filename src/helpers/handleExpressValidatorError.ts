import { NextFunction, Request, Response } from "express";
import handleSendResponse from "./handleSendResponse";
import { STATUS_TEXT } from "../enums/statusTexts.enums";
import getExpressValidatorErrors from "./getExpressValidatorErrors";

/**
 * Middleware to handle Express validator errors.
 * @param {import("express").Request} req - The Express request object.
 * @param {import("express").Response} res - The Express response object.
 * @param {import("express").NextFunction} next - The Express next middleware function.
 * @returns {void}
 */

const handleExpressValidatorErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors: string[] | null = getExpressValidatorErrors(req);

  if (errors) {
    return handleSendResponse(res, null, errors, 400, STATUS_TEXT.ERROR);
  }

  next();
};

export default handleExpressValidatorErrors;
