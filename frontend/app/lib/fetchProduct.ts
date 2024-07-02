export async function fetchProduct(productId: string) {
    const res = await fetch(`http://localhost:8080/api/product?productId=${productId}`);
    const data = await res.json();
    return data;
}
