import ProductController from "./productController";
import { productService } from "../service";

const productController: ProductController = new ProductController(productService);

export { productController };
