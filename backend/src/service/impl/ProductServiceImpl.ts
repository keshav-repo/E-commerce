import { ProductEntity } from "../../entity/ProductEntity";
import { Product } from "../../model/product";
import { ProductRepo } from "../../repo/ProductRepo";
import { ProductService } from "../ProductService";
import convertionUtility from "../../utility/conversionUtils"

class ProductServiceImpl implements ProductService {
    private productRepo: ProductRepo;
    constructor(productRepo: ProductRepo) {
        this.productRepo = productRepo;
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
