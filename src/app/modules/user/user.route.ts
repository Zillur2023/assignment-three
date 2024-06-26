import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidations } from "./user.validation";


const router = Router();

router.post('/signup',
    validateRequest(userValidations.createUserValidationSchema),
     UserControllers.createUser)


export const UserRouters = router;