import { IUser } from "../../../types/user.types";

export interface IRegisterBody extends IUser {
  password: string;
}
