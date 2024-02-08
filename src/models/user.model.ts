import { Schema, model } from "mongoose";
import { IUser } from "../types/user.types";
import { ROLES } from "../enums/roles.enums";

const UserModel = new Schema<IUser>({
  firstName: String,
  lastName: String,
  email: String,
  image_url: {
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
});

export default model<IUser>("USER", UserModel);
