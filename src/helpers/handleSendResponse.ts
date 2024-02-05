import { Response } from "express";
import { STATUS_TEXT } from "../enums/statusTexts";
import { IApiResponse, IErrorMessage } from "../types/handleSendResponse.types";

const handleSendResponse = <Data>(
  res: Response,
  data: Data,
  errors: IErrorMessage[] | null,
  code: number,
  statusText: STATUS_TEXT,
): void => {
  const response: IApiResponse<Data> = {
    data,
    errors,
    code,
    statusText,
  };

  res.status(code).json(response);
};

export default handleSendResponse;
