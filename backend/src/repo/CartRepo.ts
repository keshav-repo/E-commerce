import CartItem from "../model/cart";

export interface CartRepo {
    addToCart(userId: number, productId: number, quantity: number): Promise<void>;
    getCartDetails(userId: number): Promise<CartItem[]>;
}
