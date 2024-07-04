import { productRepo, userRepo } from "../repo";
import ProductServiceImpl from "./impl/ProductServiceImpl";
import { ProductService } from "./ProductService";
import { searchRepo } from "../repo";
import SearchServiceImpl from "./impl/SearchServiceImpl";
import { SearchService } from "./SearchService";
import { UserService } from "./UserService";
import UserServiceImpl from "./impl/UserServiceImpl";

const productService: ProductService = new ProductServiceImpl(productRepo),
    searchService: SearchService = new SearchServiceImpl(searchRepo),
    userService: UserService = new UserServiceImpl(userRepo);

export {
    productService,
    searchService,
    userService
}
