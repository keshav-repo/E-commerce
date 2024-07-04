import ProductController from "./productController";
import { productService, searchService } from "../service";
import SearchController from "./searchController";

const productController: ProductController = new ProductController(productService),
    searchController: SearchController = new SearchController(searchService);

export { productController, searchController };
