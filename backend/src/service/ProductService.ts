import { Product } from "../model/product";
import { ProductByCategoryResponse } from "../response/ProductByCategoryResponse";

export interface ProductService {
    saveProduct(product: Product): Promise<Product>;
    fetchProductById(productId: Number): Promise<Product | null>;
    getCategoryInfo(): Promise<ProductByCategoryResponse[] | null>
}
