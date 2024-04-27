import { Schema, model } from "mongoose";
import { IUser } from "../types/user.types";
import { ROLES } from "../enums/roles.enums";

const UserModel = new Schema<IUser>({
	firstName: String,
	lastName: String,
	email: String,
	imageUrl: {
		type: String,
		default: "",
	},
	cart: {
		type: [],
		default: [],
	},
	wishlist: {
		type: [],
		default: [],
	},
	role: {
		type: String,
		default: ROLES.USER,
	},
	password: String,
	verificationToken: {
		type: String,
		required: false,
	},
	verified: {
		type: Boolean,
		default: false,
	},
	resetPassword: String,
});

export default model<IUser>("USER", UserModel);
