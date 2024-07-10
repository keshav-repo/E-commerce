import { EsQuery, SearchResult } from "../response/AggregationResponse";

export interface SearchService {
    searchProduct(query: EsQuery, page: number, size: number): Promise<SearchResult | null>;
}