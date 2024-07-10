import { ProductEntity } from "../../entity/ProductEntity";
import { Product } from "../../model/product";
import { ProductRepo } from "../../repo/ProductRepo";
import { ProductService } from "../ProductService";
import convertionUtility from "../../utility/conversionUtils"
import L from "../../helper/logger";
import conversionUtils from "../../utility/conversionUtils";
import { produceMessage } from "../../utility/kafkaUtility";
import { ProductByCategoryResponse } from "../../response/ProductByCategoryResponse";

class ProductServiceImpl implements ProductService {
    private productRepo: ProductRepo;
    constructor(productRepo: ProductRepo) {
        this.productRepo = productRepo;
    }
    async fetchProductById(productId: Number): Promise<Product | null> {
        try {
            const productEntity: ProductEntity | null = await this.productRepo.findByProductId(productId);
            if (!productEntity)
                return null;
            return conversionUtils.toProduct(productEntity);
        } catch (err) {
            L.error(err);
            throw new Error(`error find product with id ${productId}`)
        }
    }
    async saveProduct(product: Product): Promise<Product> {
        try {
            let productEntity: ProductEntity = convertionUtility.toProductEntity(product);
            productEntity = await this.productRepo.save(productEntity);

            // produce data to kafka 
            produceMessage(productEntity, productEntity.productId ? productEntity.productId.toString() : 'something', 'product');

            const productRes: Product = convertionUtility.toProduct(productEntity);
            return productRes;
        } catch (error) {
            throw new Error("Unable to save product");
        }
    }
    async getCategoryInfo(): Promise<ProductByCategoryResponse[] | null> {
        try {
            return this.productRepo.findProductBriefByCategory();
        } catch (err) {
            L.error(err);
            throw new Error("Unable to fecth product brief by category");
        }
    }
}

export default ProductServiceImpl;
