import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking successful",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsIntoDB();

  sendResponse(res, {
    success: result[0] ? true : false,
    statusCode: result[0] ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result[0] ? "All bookings retrieved successfully" : "No Data Found",
    data: result,
  });
});
const getMybooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getMybookingIntoDB(req.user);


  sendResponse(res, {
    success: result[0] ? true : false,
    statusCode: result[0] ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result[0] ? "User bookings retrieved successfully" : "No Data Found",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getMybooking,
};
