import CartItem from "../model/cart";
import { CartRequest } from "../request/CartRequest";

export interface CartService {
    addToCart(cartRequest: CartRequest, userName: string): Promise<void>;
    getCartDetails(userName: string): Promise<CartItem[]>;
}
