import bcrypt from "bcrypt";
import { INewUser } from "../../../types/user.types";
import UserModel from "../../../models/user.model";

const saveUser = async (user: INewUser): Promise<void> => {
  const { password } = user;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserPayload: INewUser = {
    ...user,
    password: hashedPassword,
  };

  const newUser = new UserModel(newUserPayload);

  await newUser.save();
};

export default saveUser;
