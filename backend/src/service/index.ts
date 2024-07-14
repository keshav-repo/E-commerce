import { productRepo, userRepo, cartRepo, wishListRepo } from "../repo";
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

const productService: ProductService = new ProductServiceImpl(productRepo),
    searchService: SearchService = new SearchServiceImpl(searchRepo),
    userService: UserService = new UserServiceImpl(userRepo),
    cartService: CartService = new CartServiceImpl(cartRepo, userService),
    wishListService: WishListService = new WishListServiceImpl(wishListRepo, userService);

export {
    productService,
    searchService,
    userService,
    cartService,
    wishListService
}
