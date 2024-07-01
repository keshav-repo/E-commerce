import { Router, Request, Response } from "express";
import { productController } from "../controller";

const productRouter: Router = Router();

productRouter.get("", productController.fetchProduct);
productRouter.post("", productController.saveProduct);

export default productRouter;
