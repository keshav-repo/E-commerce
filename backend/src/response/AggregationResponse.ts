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

export interface SearchResult {
    total: number;
    items: ProductSearchDto[];
    genderFilter?: GenderFilter[];
    companyFilter?: CompanyFilter[];
}

export interface EsQuery {
    category?: string;
    name?: string
}