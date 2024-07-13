import ProductController from "./productController";
import { cartService, productService, searchService, userService } from "../service";
import SearchController from "./searchController";
import UserController from "./UserController";
import HomePageController from "./HomePageController";
import CartController from "./CartController";

const productController: ProductController = new ProductController(productService),
    searchController: SearchController = new SearchController(searchService),
    userController: UserController = new UserController(userService),
    homePageController: HomePageController = new HomePageController(productService),
    cartController: CartController = new CartController(cartService);

export {
    productController, searchController, userController,
    homePageController, cartController
};
