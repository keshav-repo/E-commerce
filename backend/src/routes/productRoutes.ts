import { Router, Request, Response } from "express";
import { productController } from "../controller";
import { jWTMiddleware } from "../middleware";

const productRouter: Router = Router();

productRouter.get("", productController.fetchProduct);
productRouter.post("", jWTMiddleware.authenticateJWT, productController.saveProduct);

productRouter.post("/check-delivery", productController.checkDelivery);

export default productRouter;
