import { ProductType } from "./product.types";
import { ROLES } from "../enums/roles.enums";

export type IUser = {
	_id?: string;
	firstName: string;
	lastName: string;
	email: string;
	imageUrl: string;
	password: string;
	wishlist: ProductType[];
	cart: ProductType[];
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
