import { Router, Request, Response } from "express";
import { productController } from "../controller";

const productRouter: Router = Router();

productRouter.get("", productController.fetchProduct);

export default productRouter;
