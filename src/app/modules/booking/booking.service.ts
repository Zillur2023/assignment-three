import httpStatus from "http-status";
import Service from "../service/service.mode";
import Slot from "../solt/slot.model";
import User from "../user/user.model";
import Booking from "./booking.model";
import AppError from "../../errors/AppError";
import { IBookingPayload } from "./booking.contant";
import { JwtPayload } from "jsonwebtoken";

const createBookingIntoDB = async (
  user: JwtPayload,
  payload: IBookingPayload
) => {
  const isCustomerExists = await User.findOne({ email: user.email });

  if (!isCustomerExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This customer not found");
  }

  const isServiceExists = await Service.findById(payload.serviceId);

  if (!isServiceExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This service not found");
  }

  // const isSlotExists = await Slot.findById(payload.slotId);
  const isSlotExists = await Slot.findByIdAndUpdate(
    payload.slotId,
    { isBooked: "booked" },
    { new: true }
  );

  if (!isSlotExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This slot not found");
  }

  const result = await Booking.create({
    customer: isCustomerExists?._id,
    service: payload.serviceId,
    slot: payload.slotId,
    vehicleType: payload.vehicleType,
    vehicleBrand: payload.vehicleBrand,
    vehicleModel: payload.vehicleModel,
    manufacturingYear: payload.manufacturingYear,
    registrationPlate: payload.registrationPlate,
  });

  return (
    await (await result.populate("customer")).populate("service")
  ).populate("slot");
};

const getAllBookingsIntoDB = async () => {
  const result = await Booking.find()
    .populate("customer")
    .populate("service")
    .populate("slot");

  return result;
};

const getMybookingIntoDB = async (user: JwtPayload) => {
  const isUserExists = await User.findOne({ email: user.email });
  if ( !isUserExists ) {
    throw new AppError (httpStatus.NOT_FOUND, "User not found")
  }

  const result = await Booking.find({ customer: isUserExists?._id })
  .populate("customer")
  .populate("service")
  .populate("slot");;

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsIntoDB,
  getMybookingIntoDB,
};
