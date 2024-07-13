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

const productRepo: ProductRepo = new ProductRepoImpl(),
    searchRepo: SearchRepo = new SearchRepoImpl(client),
    userRepo: UserRepository = new UserRepositoryImpl(),
    cartRepo: CartRepo = new CartRepoImpl(prisma);

export { productRepo, searchRepo, userRepo, cartRepo };
