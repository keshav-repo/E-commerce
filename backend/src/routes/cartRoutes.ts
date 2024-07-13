import { Router } from "express";
import { cartController } from "../controller";
import { jWTMiddleware } from "../middleware";

const cartRouter: Router = Router();

cartRouter.post("", jWTMiddleware.authenticateJWT, cartController.addToCart);

export default cartRouter;
