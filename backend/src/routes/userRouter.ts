import { Router } from "express";
import { userController } from "../controller";

const userRouter: Router = Router();

userRouter.post("/login", userController.login);
userRouter.post("", userController.addUser);
userRouter.post('/logout', userController.logout);

export default userRouter;
