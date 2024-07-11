import { Product } from "../../model/product";
import { SearchRepo } from "../SearchRepo";
import L from "../../helper/logger";
import { Client } from "@elastic/elasticsearch";
import { SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import { CompanyFilter, EsQuery, FilterItem, GenderFilter, ProductSearchDto, SearchFilter, SearchResult } from "../../response/AggregationResponse";
import { CONSTANTS } from "../../config";

class SearchRepoImpl implements SearchRepo {
    private client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    async queryProduct(query: EsQuery, page: number, size: number): Promise<SearchResult | null> {
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
                from: from,
                size: size
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
                        name: query.name!
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
                    const companyItems: FilterItem[] = distinctCompanies.map(bucket => ({
                        name: bucket.key,
                        count: bucket.doc_count
                    }));
                    const companyFilter: SearchFilter = {
                        criteria: CONSTANTS.COMPANY_CRITERIA,
                        values: companyItems
                    }

                    const distinctGender: any[] = aggregations.distinct_gender.buckets;
                    const genderItems: FilterItem[] = distinctGender.map(bucket => ({
                        name: bucket.key,
                        count: bucket.doc_count
                    }));
                    const genderFilter: SearchFilter = {
                        criteria: CONSTANTS.GENDER_CRITERIS,
                        values: genderItems
                    }

                    const minPrice = aggregations.min_price.value;

                    const maxPrice = aggregations.max_price.value;

                    const esResult: SearchResult = {
                        items: items,
                        totalItem: total.value,
                        filters: [companyFilter, genderFilter],
                        minPrice: minPrice,
                        maxPrice: maxPrice,
                        currentPage: page,
                        pageSize: size,
                        totalPage: Math.ceil(total.value / size)
                    };
                    return esResult;
                } else {
                    const esResult: SearchResult = {
                        items: items,
                        totalItem: total.value,
                        currentPage: page,
                        pageSize: size,
                        totalPage: Math.ceil(total.value / size)
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