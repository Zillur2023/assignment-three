import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";



const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const {  token, userWithoutPassword } = result;
  
    res.cookie('token', token, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
    });
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      // message: `${user.role} is logged in succesfully!`,
      message: `User logged in successfully`,
      token: token,
      data: userWithoutPassword,
    });
  });

  export const AuthControllers = {
    loginUser
  }