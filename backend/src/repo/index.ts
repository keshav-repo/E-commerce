import { ProductRepo } from "./ProductRepo";
import { SearchRepo } from "./SearchRepo";
import ProductRepoImpl from "./impl/ProductRepoImpl";
import SearchRepoImpl from "./impl/searchRepoImpl";
import { client } from "../db/es";

const productRepo: ProductRepo = new ProductRepoImpl(),
    searchRepo: SearchRepo = new SearchRepoImpl(client);

export { productRepo, searchRepo };
