export interface CompanyFilter {
    name: string;
    itemCount: number;
}

export interface GenderFilter {
    name: string;
    itemCount: number
}

export interface ProductSearchDto {
    productId: number;
    name: string;
    price: number;
    company: string;
}

export interface FilterItem {
    name: string;
    count: number
}

export interface SearchFilter {
    criteria: string;
    values: FilterItem[]
}

export interface SearchResult {
    total: number;
    items: ProductSearchDto[];
    filters?: SearchFilter[],
    minPrice?: number,
    maxPrice?: number
}

export interface EsQuery {
    category?: string;
    name?: string
}