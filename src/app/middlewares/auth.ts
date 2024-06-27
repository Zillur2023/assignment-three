import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import User from "../modules/user/user.model";
import sendResponse from "../utils/sendResponse";


const auth = (payload: string) => {
    // console.log(role)
    return catchAsync(async (req, res, next) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const token: any = req.headers.authorization?.split(' ')[1];

      // console.log({token})
  
      // checking if the token is missing
      if (!token) {
        // throw new AppError(httpStatus.UNAUTHORIZED, 'You have no access to this route');
        sendResponse(res, {
          success:  false,
          statusCode: 401,
          message: "You have no access to this route",
        });
      }
  
      // checking if the given token is valid
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
  
      const { email } = decoded;
  
      // checking if the user is exist
      const user = await User.findOne({email: email});
  
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
      }
    

    //  console.log(payload, user.role)
      if (!(payload === user.role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized!',
        );
      }
  
      req.user = decoded as JwtPayload;
      next();
    });
  };
  
  export default auth;