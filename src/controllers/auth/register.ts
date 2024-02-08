import { NextFunction, Request, Response } from "express";
import { INewUser, IUser } from "../../types/user.types";
import getUser from "./helpers/getUser";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts.enums";
import bcrypt from "bcrypt";
import UserModel from "../../models/user.model";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password }: IUser = req.body;

  const user = await getUser(email);

  if (user) {
    return handleSendResponse(
      res,
      null,
      ["the user already exists!"],
      409,
      STATUS_TEXT.ERROR,
      next,
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserPayload: INewUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
  };

  const newUser = new UserModel(newUserPayload);

  await newUser.save();

  handleSendResponse(res, { newUser }, null, 201, STATUS_TEXT.SUCCESSFUL);
};

export default register;
