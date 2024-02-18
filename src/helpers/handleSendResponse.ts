import { NextFunction, Response } from "express";
import { STATUS_TEXT } from "../enums/statusTexts.enums";
import { IApiResponse, IErrorMessage } from "../types/handleSendResponse.types";

const handleSendResponse = <Data>(
	res: Response,
	data: Data,
	errors: IErrorMessage[] | null,
	code: number,
	statusText: STATUS_TEXT,
	next?: NextFunction
) => {
	const response: IApiResponse<Data> = {
		data,
		errors,
		code,
		statusText,
	};

	if (errors?.length && next) return next(res.status(code).json(response));

	return res.status(code).json(response);
};

export default handleSendResponse;
