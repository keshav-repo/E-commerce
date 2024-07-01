import { ProductEntity } from "../../entity/ProductEntity";
import { Product } from "../../model/product";
import { ProductRepo } from "../../repo/ProductRepo";
import { ProductService } from "../ProductService";
import convertionUtility from "../../utility/conversionUtils"
import L from "../../helper/logger";
import conversionUtils from "../../utility/conversionUtils";

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
            const productRes: Product = convertionUtility.toProduct(productEntity);
            return productRes;
        } catch (error) {
            throw new Error("Unable to save product");
        }
    }
}

export default ProductServiceImpl;
