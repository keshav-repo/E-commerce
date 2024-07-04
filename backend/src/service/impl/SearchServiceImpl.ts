import { Product } from "../../model/product";
import { SearchRepo } from "../../repo/SearchRepo";
import { SearchResult } from "../../response/SearchResult";
import { SearchService } from "../SearchService";

class SearchServiceImpl implements SearchService {
    private searchRepo: SearchRepo;
    constructor(searchRepo: SearchRepo) {
        this.searchRepo = searchRepo;
        this.searchProduct = this.searchProduct.bind(this);
    }

    async searchProduct(query: string, page: number, size: number): Promise<Product[] | null> {
        try {
            const result: SearchResult<Product> | null = await this.searchRepo.queryProduct(query, page, size);
            if (result) {
                return result.items;
            } else {
                return null;
            }
        } catch (err) {
            throw new Error("error searching product");
        }
    }
}

export default SearchServiceImpl;
