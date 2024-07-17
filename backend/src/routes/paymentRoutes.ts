import { Router } from "express";
import { paymentController } from "../controller";

const paymentRouter: Router = Router();

paymentRouter.post("/checkout", paymentController.checkout);

export default paymentRouter;
