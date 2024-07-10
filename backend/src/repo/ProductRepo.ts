import { ProductEntity } from "../entity/ProductEntity";
import { ProductByCategoryResponse } from "../response/ProductByCategoryResponse";

export interface ProductRepo {
    findByProductId(productId: Number): Promise<ProductEntity | null>;
    save(product: ProductEntity): Promise<ProductEntity>;
    findProductBriefByCategory(): Promise<ProductByCategoryResponse[] | null>
}
