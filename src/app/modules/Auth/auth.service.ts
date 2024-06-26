import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";
import bcrypt from 'bcrypt'


const loginUser = async (payload: ILoginUser) => {
    // checking if the user is exist
    const userWithPassword  = await User.findOne({email:payload.email}).select('+password');
    // console.log({userWithPassword })
  
    if (!userWithPassword ) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
  
    //checking if the password is correct
    const passwordMatched = await bcrypt.compare(payload?.password, userWithPassword ?.password);
  
    if (!passwordMatched)
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  
    const {password, ...userWithoutPassword} = userWithPassword.toObject()
  
  
    const jwtPayload = {
      email: userWithPassword .email,
      role: userWithPassword .role,
    };
  
    const token = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
  
  
    return {
      token,
      userWithoutPassword
    };
  };

  export const AuthServices = {
    loginUser,
   
  };