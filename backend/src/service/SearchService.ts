import { Product } from "../model/product";

export interface SearchService {
    searchProduct(query: string, page: number, size: number): Promise<Product[] | null>;
}