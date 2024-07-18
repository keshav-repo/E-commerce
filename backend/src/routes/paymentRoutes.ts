import { Router } from "express";
import { paymentController } from "../controller";

const paymentRouter: Router = Router();

// express.raw({type: 'application/json'})

paymentRouter.post("/checkout", paymentController.checkout);
// paymentRouter.post("/webhook", paymentController.stripeWebhook);

export default paymentRouter;
