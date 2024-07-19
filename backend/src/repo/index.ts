import { ProductRepo } from "./ProductRepo";
import { SearchRepo } from "./SearchRepo";
import { UserRepository } from "./UserRepository";
import ProductRepoImpl from "./impl/ProductRepoImpl";
import SearchRepoImpl from "./impl/searchRepoImpl";
import { client } from "../db/es";
import UserRepositoryImpl from "./impl/UserRepositoryImpl";
import { CartRepo } from "./CartRepo";
import CartRepoImpl from "./impl/CartRepoImpl";
import { prisma } from "../db";
import WishListRepoImpl from "./impl/WishListRepoImpl";
import { WishListRepo } from "./WishListRepo";
import { OrderRepo } from "./OrderRepo";
import OrderRepoImpl from "./impl/OrderRepoImpl";


const productRepo: ProductRepo = new ProductRepoImpl(),
    searchRepo: SearchRepo = new SearchRepoImpl(client),
    userRepo: UserRepository = new UserRepositoryImpl(),
    cartRepo: CartRepo = new CartRepoImpl(prisma),
    wishListRepo: WishListRepo = new WishListRepoImpl(prisma),
    orderRepo: OrderRepo = new OrderRepoImpl(prisma);

export { productRepo, searchRepo, userRepo, cartRepo, wishListRepo, orderRepo };
