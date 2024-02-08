import UserModel from "../../../models/user.model";
import { IUser } from "../../../types/user.types";

const getUser = async (email: string) => {
  const user: IUser | null = await UserModel.findOne({ email });

  if (!user) return null;

  return user;
};

export default getUser;
