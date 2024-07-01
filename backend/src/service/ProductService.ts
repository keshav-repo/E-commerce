import { Product } from "../model/product";

export interface ProductService {
    saveProduct(product: Product): Promise<Product>;
}