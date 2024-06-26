import { IUser } from "./user.interface";
import User from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
  const userWithPassword = await User.create(payload);

  const {password, ...userWithoutPassword} = userWithPassword.toObject()

  return userWithoutPassword;
};

export const UserServices = {
  createUserIntoDB,
};
