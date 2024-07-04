import { productRepo } from "../repo";
import ProductServiceImpl from "./impl/ProductServiceImpl";
import { ProductService } from "./ProductService";
import { searchRepo } from "../repo";
import SearchServiceImpl from "./impl/SearchServiceImpl";
import { SearchService } from "./SearchService";

const productService: ProductService = new ProductServiceImpl(productRepo),
    searchService: SearchService = new SearchServiceImpl(searchRepo);

export {
    productService,
    searchService
}