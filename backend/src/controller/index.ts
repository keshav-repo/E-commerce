import ProductController from "./productController";
import { cartService, paymentService, productService, searchService, userService, wishListService, } from "../service";
import SearchController from "./searchController";
import UserController from "./UserController";
import HomePageController from "./HomePageController";
import CartController from "./CartController";
import WishListController from "./WishListController";
import PaymentController from "./PaymentController";

const productController: ProductController = new ProductController(productService),
    searchController: SearchController = new SearchController(searchService),
    userController: UserController = new UserController(userService),
    homePageController: HomePageController = new HomePageController(productService),
    cartController: CartController = new CartController(cartService),
    wishlistController: WishListController = new WishListController(wishListService),
    paymentController: PaymentController = new PaymentController(paymentService);

export {
    productController, searchController, userController,
    homePageController, cartController, wishlistController,
    paymentController
};
