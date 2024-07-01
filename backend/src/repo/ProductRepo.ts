import { ProductEntity } from "../entity/ProductEntity";

export interface ProductRepo {
    findByProductId(productId: Number): Promise<ProductEntity | null>;
    save(product: ProductEntity): Promise<ProductEntity>;
}
