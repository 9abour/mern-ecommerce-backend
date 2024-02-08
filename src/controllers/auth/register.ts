import { Request, Response } from "express";
import { IRegisterBody } from "./types";

const register = (req: Request, res: Response) => {
  const { firstName, lastName, email, password }: IRegisterBody = req.body;
};
