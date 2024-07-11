import { SearchRepo } from "../../repo/SearchRepo";
import { EsQuery, SearchResult } from "../../response/AggregationResponse";
import { SearchService } from "../SearchService";

class SearchServiceImpl implements SearchService {
    private searchRepo: SearchRepo;
    constructor(searchRepo: SearchRepo) {
        this.searchRepo = searchRepo;
        this.searchProduct = this.searchProduct.bind(this);
    }

    async searchProduct(query: EsQuery, page: number = 1, size: number = 10): Promise<SearchResult | null> {
        try {
            const result: SearchResult | null = await this.searchRepo.queryProduct(query, page, size);
            if (result) {
                return result;

            } else {
                return null;
            }
        } catch (err) {
            throw new Error("error searching product");
        }
    }
}

export default SearchServiceImpl;
