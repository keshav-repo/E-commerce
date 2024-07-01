import { ProductRepo } from "./ProductRepo";
import ProductRepoImpl from "./impl/ProductRepoImpl";
import { client } from "../db/postgres";

const productRepo: ProductRepo = new ProductRepoImpl(client);

export { productRepo };
