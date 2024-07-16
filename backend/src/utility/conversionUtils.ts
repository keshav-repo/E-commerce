import { ProductEntity } from "../entity/ProductEntity";
import { Product } from "../model/product";

const toProduct = (entity: ProductEntity): Product => {
    return {
        productId: entity.productId!,
        name: entity.name,
        description: entity.description,
        price: entity.price,
        category: entity.category,
        company: entity.company,
        additionalInfo: entity.additionalInfo,
        images: entity.images,
        gender: entity.gender
    };
};

const toProductEntity = (product: Product): ProductEntity => {
    return {
        productId: product.productId,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        company: product.company,
        additionalInfo: product.additionalInfo,
        images: product.images,
        gender: product.gender!
    };
};

export default {
    toProduct, toProductEntity
}
