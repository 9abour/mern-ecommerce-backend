import { IProduct } from "./product.types";
import { ROLES } from "../enums/roles.enums";

export type IUser = {
	_id?: string;
	firstName: string;
	lastName: string;
	email: string;
	image_url: string;
	password: string;
	wishlist: IProduct[];
	cart: IProduct[];
	role: ROLES;
	verificationToken?: string;
	verified?: boolean;
	resetPassword?: string;
};

export type INewUser = Pick<
	IUser,
	| "firstName"
	| "lastName"
	| "email"
	| "password"
	| "verificationToken"
	| "verified"
>;
