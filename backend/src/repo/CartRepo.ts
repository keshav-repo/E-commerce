export interface CartRepo {
    addToCart(userId: number, productId: number, quantity: number): Promise<void>;
}
