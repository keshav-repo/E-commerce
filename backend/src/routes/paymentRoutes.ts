import { Router } from "express";
import { paymentController } from "../controller";
import { jWTMiddleware } from "../middleware";

const paymentRouter: Router = Router();

paymentRouter.post("/order", jWTMiddleware.authenticateJWT, paymentController.createOrder);
paymentRouter.post("/checkout", paymentController.checkout);

export default paymentRouter;
