import { Product } from "../../model/product";
import { SearchRepo } from "../SearchRepo";
import L from "../../helper/logger";
import { Client } from "@elastic/elasticsearch";
import { SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import { CompanyFilter, EsQuery, GenderFilter, ProductSearchDto, SearchResult } from "../../response/AggregationResponse";


class SearchRepoImpl implements SearchRepo {
    private client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    async queryProduct(query: EsQuery, page: number = 1, size: number = 10): Promise<SearchResult | null> {
        try {
            const from = (page - 1) * size;
            const jsonData: any = {
                _source: ["name", "price", "company", "productId"],
                aggs: {
                    distinct_companies: {
                        terms: {
                            field: "company",
                            size: 1000
                        }
                    },
                    distinct_gender: {
                        terms: {
                            field: "gender",
                            size: 1000
                        }
                    },
                    min_price: {
                        min: {
                            field: "price"
                        }
                    },
                    max_price: {
                        max: {
                            field: "price"
                        }
                    }
                },
                query: {
                    match: {
                        category: query
                    }
                },
                from: 2,
                size: 10
            }

            if (query.category) {
                jsonData['query'] = {
                    match: {
                        category: query.category!
                    }
                }
            }
            if (query.name) {
                jsonData['query'] = {
                    match: {
                        category: query.category!
                    }
                }
            }
            jsonData._source.unshift("images");

            L.info('json data is');
            L.info(JSON.stringify(jsonData));

            const result: SearchResponse = await this.client.search<Product>({
                index: 'product',
                body: jsonData
            });

            L.info('es result is');
            L.info(JSON.stringify(result));

            const total = result.hits.total as any;
            if (total.value > 0) {
                const items: ProductSearchDto[] = result.hits.hits.map(hit => hit._source as ProductSearchDto);

                const aggregations: any = result.aggregations;

                if (aggregations) {
                    const distinctCompanies: any[] = aggregations.distinct_companies.buckets;
                    const companyFilter: CompanyFilter[] = distinctCompanies.map(bucket => ({
                        name: bucket.key,
                        itemCount: bucket.doc_count
                    }));

                    const distinctGender: any[] = aggregations.distinct_gender.buckets;

                    const genderFilter: GenderFilter[] = distinctGender.map(bucket => ({
                        name: bucket.key,
                        itemCount: bucket.doc_count
                    }));

                    const minPrice = aggregations.min_price.value;

                    const maxPrice = aggregations.max_price.value;

                    const esResult: SearchResult = {
                        items: items,
                        total: total,
                        companyFilter: companyFilter,
                        genderFilter: genderFilter
                    };
                    return esResult;
                } else {
                    const esResult: SearchResult = {
                        items: items,
                        total: total
                    };
                    return esResult;
                }
            } else {
                console.warn('No products found');
                return null;
            }

        } catch (error) {
            console.error('Error searching for product:', error);
            return null;
        }
    }
}

export default SearchRepoImpl;