import { IProduct } from "./product.types";

export type IUser = {
  username: string;
  email: string;
  image_url: string;
  wishlist: IProduct[];
  cart: IProduct[];
};
