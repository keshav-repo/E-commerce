import CartItem from "../model/cart";
import { CartRequest } from "../request/CartRequest";

export interface CartRepo {
    addToCart(userId: number, cartRequest: CartRequest): Promise<void>;
    getCartDetails(userId: number): Promise<CartItem[]>;
    deleteCartItem(userId: number, productId: number): Promise<void>;
}
