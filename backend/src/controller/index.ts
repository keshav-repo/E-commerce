import ProductController from "./productController";
import { productService, searchService, userService } from "../service";
import SearchController from "./searchController";
import UserController from "./UserController";


const productController: ProductController = new ProductController(productService),
    searchController: SearchController = new SearchController(searchService),
    userController: UserController = new UserController(userService);

export { productController, searchController, userController };
