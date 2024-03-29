import { Request } from "express";
import { IUser } from "./user.types";

export type IPublicUser = Pick<
	IUser,
	| "_id"
	| "firstName"
	| "lastName"
	| "email"
	| "image_url"
	| "cart"
	| "wishlist"
	| "role"
>;

export interface IPrivateRequest extends Request {
	user?: IPublicUser;
}
