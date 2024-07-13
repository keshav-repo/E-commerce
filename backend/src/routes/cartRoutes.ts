import { Router } from "express";
import { cartController } from "../controller";
import { jWTMiddleware } from "../middleware";

const cartRouter: Router = Router();

cartRouter.post("", jWTMiddleware.authenticateJWT, cartController.addToCart);
cartRouter.get("", jWTMiddleware.authenticateJWT, cartController.fetchCartDetails);

export default cartRouter;
