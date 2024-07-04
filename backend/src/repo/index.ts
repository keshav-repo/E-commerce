import { ProductRepo } from "./ProductRepo";
import { SearchRepo } from "./SearchRepo";
import { UserRepository } from "./UserRepository";
import ProductRepoImpl from "./impl/ProductRepoImpl";
import SearchRepoImpl from "./impl/searchRepoImpl";
import { client } from "../db/es";
import UserRepositoryImpl from "./impl/UserRepositoryImpl";

const productRepo: ProductRepo = new ProductRepoImpl(),
    searchRepo: SearchRepo = new SearchRepoImpl(client),
    userRepo: UserRepository = new UserRepositoryImpl();

export { productRepo, searchRepo, userRepo };
