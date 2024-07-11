import { CategoryItem, SeaechQuery, SearchApiResponse } from "./definitions";

export async function fetchProduct(productId: string) {
    const res = await fetch(`http://localhost:8080/api/product?productId=${productId}`);
    const data = await res.json();
    return data;
}

export async function fetchCategoryInfo(): Promise<CategoryItem[]> {
    const res = await fetch(`http://localhost:8080/api/view/home`);
    const data = await res.json();
    return data.data;
}

export async function fetchSearch(searchQuery: SeaechQuery, page: number, size: number): Promise<SearchApiResponse> {
    const query = encodeURIComponent(JSON.stringify(searchQuery));
    const url = `http://localhost:8080/api/search?page=${page}&size=${size}&query=${query}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
}