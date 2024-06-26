import { Router } from "express";
import { ServiceControllers } from "./service.controller";
import validateRequest from "../../middlewares/validateRequest";
import { serviceValidations } from "./service.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

// router.post(
//   '/create-student',
//   auth(USER_ROLE.admin),
//   validateRequest(createStudentValidationSchema),
//   UserControllers.createStudent,
// );

router.post(
  "/services",
  auth(USER_ROLE.admin),
  validateRequest(serviceValidations.createServiceValidationSchema),
  ServiceControllers.createService
);

router.get("/services", ServiceControllers.getAllServices);

router.get("/services/:id", ServiceControllers.getSingleService);

router.put(
  "/services/:id",
  auth(USER_ROLE.admin),
  validateRequest(serviceValidations.updateServiceValidationSchema),
  ServiceControllers.updateSingleService
);

router.delete(
  "/services/:id",
  auth(USER_ROLE.admin),
  ServiceControllers.deleteSingleService
);

export const ServiceRouters = router;
