import { Request } from "express";
import { IUser } from "./user.types";

export type IPublicUser = Pick<
	IUser,
	| "_id"
	| "firstName"
	| "lastName"
	| "email"
	| "imageUrl"
	| "cart"
	| "wishlist"
	| "role"
>;

export interface PrivateRequestType extends Request {
	user?: IPublicUser;
}
