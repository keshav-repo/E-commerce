import { Product } from "../../model/product";
import { SearchRepo } from "../SearchRepo";
import L from "../../helper/logger";
import { Client } from "@elastic/elasticsearch";
import { AggregationsAggregate, SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import { SearchResult } from "../../response/SearchResult";

class SearchRepoImpl implements SearchRepo {
    private client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    async queryProduct(query: string, page: number = 1, size: number = 10): Promise<SearchResult<Product> | null> {
        try {
            const from = (page - 1) * size;
            // SearchResponse<Product
            //  SearchResponse<Product, Record<string, AggregationsAggregate>>
            const result = await this.client.search<Product>({
                index: 'product',
                body: {
                    query: {
                        multi_match: {
                            query: query,
                            fields: ["name", "description"],
                            fuzziness: "auto"
                        }
                    },
                    from: from,
                    size: size
                }
            });

            const total = result.hits.hits.length;
            if (total > 0) {
                const items: Product[] = result.hits.hits.map(hit => hit._source as Product);
                return { total, items };
            } else {
                L.warn('No products found');
                return null;
            }

        } catch (error) {
            L.error('Error searching for product:', error);
            return null;
        }
    }
}

export default SearchRepoImpl;