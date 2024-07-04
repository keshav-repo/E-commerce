import { Product } from "../model/product";
import { SearchResult } from "../response/SearchResult";

export interface SearchRepo {
    queryProduct(query: string, page: number, size: number): Promise<SearchResult<Product> | null>;
}
