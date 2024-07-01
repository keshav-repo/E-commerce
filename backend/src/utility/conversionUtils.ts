import { ProductEntity } from "../entity/ProductEntity";
import { Product } from "../model/product";

const toProduct = (entity: ProductEntity): Product => {
    return {
        productId: entity.productId ? entity.productId : "",
        name: entity.name,
        description: entity.description,
        price: entity.price,
        category: entity.category,
    };
};

const toProductEntity = (product: Product): ProductEntity => {
    return {
        productId: product.productId,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
    };
};

export default {
    toProduct, toProductEntity
}
