import { productRepo, userRepo, cartRepo, wishListRepo, orderRepo } from "../repo";
import ProductServiceImpl from "./impl/ProductServiceImpl";
import { ProductService } from "./ProductService";
import { searchRepo } from "../repo";
import SearchServiceImpl from "./impl/SearchServiceImpl";
import { SearchService } from "./SearchService";
import { UserService } from "./UserService";
import UserServiceImpl from "./impl/UserServiceImpl";
import { CartService } from "./CartService";
import CartServiceImpl from "./impl/CartServiceImpl";
import { WishListService } from "./wishlistService";
import WishListServiceImpl from "./impl/WishListServiceImpl";
import { StripeService } from "./StripeService";
import StripeServiceImpl from "./impl/StripeServiceImpl";
import { stripe } from "../middleware";
import PaymentService from "./PaymentService";
import PaymentServiceImpl from "./impl/PaymentServiceImpl";

const productService: ProductService = new ProductServiceImpl(productRepo),
    searchService: SearchService = new SearchServiceImpl(searchRepo),
    userService: UserService = new UserServiceImpl(userRepo),
    cartService: CartService = new CartServiceImpl(cartRepo, userService),
    wishListService: WishListService = new WishListServiceImpl(wishListRepo, userService),
    stripeService: StripeService = new StripeServiceImpl(stripe),
    paymentService: PaymentService = new PaymentServiceImpl(orderRepo, userService);

export {
    productService,
    searchService,
    userService,
    cartService,
    wishListService,
    stripeService,
    paymentService
}
