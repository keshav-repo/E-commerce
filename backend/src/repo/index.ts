import { ProductRepo } from "./ProductRepo";
import ProductRepoImpl from "./impl/ProductRepoImpl";

const productRepo: ProductRepo = new ProductRepoImpl();

export { productRepo };
