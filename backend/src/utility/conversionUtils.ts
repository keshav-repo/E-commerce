import { ProductEntity } from "../entity/ProductEntity";
import { Product } from "../model/product";

const toProduct = (entity: ProductEntity): Product => {
    return {
        productId: entity.productId ? entity.productId.toString() : "",
        name: entity.name,
        description: entity.description,
        price: entity.price,
        category: entity.category,
        company: entity.company,
        additionalInfo: entity.additionalInfo,
        images: entity.images
    };
};

const toProductEntity = (product: Product): ProductEntity => {
    return {
        productId: parseInt(product.productId),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        company: product.company,
        additionalInfo: product.additionalInfo,
        images: product.images
    };
};

export default {
    toProduct, toProductEntity
}
