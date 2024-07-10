import ProductController from "./productController";
import { productService, searchService, userService } from "../service";
import SearchController from "./searchController";
import UserController from "./UserController";
import HomePageController from "./HomePageController";

const productController: ProductController = new ProductController(productService),
    searchController: SearchController = new SearchController(searchService),
    userController: UserController = new UserController(userService),
    homePageController: HomePageController = new HomePageController(productService);

export { productController, searchController, userController, homePageController };
