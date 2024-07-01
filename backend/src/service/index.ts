import { productRepo } from "../repo";
import ProductServiceImpl from "./impl/ProductServiceImpl";
import { ProductService } from "./ProductService";

const productService: ProductService = new ProductServiceImpl(productRepo);

export {
    productService
}