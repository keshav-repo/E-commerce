import { CategoryItem, Product, SeaechQuery, SearchApiResponse } from "./definitions";

export async function fetchProduct(productId: string): Promise<Product> {
    const res = await fetch(`http://localhost:8080/api/product?productId=${productId}`);
    const data = await res.json();
    return data.data;
}

export async function fetchCategoryInfo(): Promise<CategoryItem[]> {
    const res = await fetch(`http://localhost:8080/api/view/home`);
    const data = await res.json();
    return data.data;
}

export async function fetchSearch(searchQuery: string, page: number, size: number): Promise<SearchApiResponse> {
    const url = `http://localhost:8080/api/search?page=${page}&size=${size}&query=${searchQuery}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
}