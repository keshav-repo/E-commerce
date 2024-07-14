import ProductController from "./productController";
import { cartService, productService, searchService, userService, wishListService } from "../service";
import SearchController from "./searchController";
import UserController from "./UserController";
import HomePageController from "./HomePageController";
import CartController from "./CartController";
import WishListController from "./WishListController";

const productController: ProductController = new ProductController(productService),
    searchController: SearchController = new SearchController(searchService),
    userController: UserController = new UserController(userService),
    homePageController: HomePageController = new HomePageController(productService),
    cartController: CartController = new CartController(cartService),
    wishlistController: WishListController = new WishListController(wishListService)

export {
    productController, searchController, userController,
    homePageController, cartController, wishlistController
};
