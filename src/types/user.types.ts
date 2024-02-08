import { IProduct } from "./product.types";
import { ROLES } from "../enums/roles.enums";

export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  image_url: string;
  wishlist: IProduct[];
  cart: IProduct[];
  role: ROLES;
};
