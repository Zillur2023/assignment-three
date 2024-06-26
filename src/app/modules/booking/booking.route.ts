import { Router } from "express";
import { BookingControllers } from "./booking.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidations } from "./booking.validation";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/bookings",
  auth(USER_ROLE.user),
    validateRequest(bookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking
);

router.get("/bookings",auth(USER_ROLE.admin), BookingControllers.getAllBookings);

router.get("/my-bookings", auth(USER_ROLE.user), BookingControllers.getMybooking)

export const BookingRoutes = router;
