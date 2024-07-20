import { Router } from "express";
import { paymentController } from "../controller";
import { jWTMiddleware } from "../middleware";

const paymentRouter: Router = Router();

paymentRouter.post("/order", jWTMiddleware.authenticateJWT, paymentController.createOrder);
paymentRouter.post("/checkout", jWTMiddleware.authenticateJWT, paymentController.checkout);
paymentRouter.get("/order", jWTMiddleware.authenticateJWT, paymentController.fetchOrder);

export default paymentRouter;
