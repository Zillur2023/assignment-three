import { Router } from "express";
import { SlotControllers } from "./slot.controller";
import validateRequest from "../../middlewares/validateRequest";
import { slotValidations } from "./slot.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const route = Router();

route.post(
  "/services/slots",
  auth(USER_ROLE.admin),
  validateRequest(slotValidations.createSlotValidationSchema),
  SlotControllers.createSlot
);
route.get("/slots/availability", SlotControllers.available);

export const SlotRoutes = route;
