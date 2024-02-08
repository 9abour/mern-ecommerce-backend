import { IProduct } from "./product.types";
import { ROLES } from "../enums/roles.enums";

export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  image_url: string;
  password: string;
  wishlist: IProduct[];
  cart: IProduct[];
  role: ROLES;
};

export type INewUser = Pick<
  IUser,
  "firstName" | "lastName" | "email" | "password"
>;
