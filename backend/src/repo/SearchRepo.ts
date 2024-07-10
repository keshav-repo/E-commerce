import { EsQuery, SearchResult } from "../response/AggregationResponse";


export interface SearchRepo {
    queryProduct(query: EsQuery, page: number, size: number): Promise<SearchResult | null>;
}
