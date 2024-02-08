import { NextFunction, Request, Response } from "express";
import { IUser } from "../../types/user.types";
import getUser from "./helpers/getUser";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import saveUser from "./helpers/saveUser";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password }: IUser = req.body;

  const user = await getUser(email);

  if (user) {
    handleSendResponse(
      res,
      null,
      ["the user already exists!"],
      409,
      STATUS_TEXT.ERROR,
      next,
    );
  }

  const newUser = await saveUser({ firstName, lastName, email, password });

  handleSendResponse(res, { newUser }, null, 201, STATUS_TEXT.SUCCESSFUL);
};

export default register;
