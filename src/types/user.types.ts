import {IProduct} from "./product.types";

export interface IUser {
    username: string;
    email: string;
    image_url: string;
    wishlist: IProduct[]
    cart: IProduct[];
}