
import { CartRepo } from "../../repo/CartRepo";
import { CartRequest } from "../../request/CartRequest";
import { CartService } from "../CartService";
import { User } from "../../model/User";
import { UserService } from "../UserService";
import L from "../../helper/logger";
import CartItem from "../../model/cart";
import { BaseError } from "../../error/BaseError";
import { InternalServerError } from "../../error/InternalServerError";
import { ResponseTypes } from "../../config/ResponseTypes";

class CartServiceImpl implements CartService {
    private cartRepo: CartRepo;
    private userService: UserService;
    constructor(cartRepo: CartRepo, userService: UserService) {
        this.cartRepo = cartRepo;
        this.userService = userService;
        this.addToCart = this.addToCart.bind(this);
    }
    async deleteCartItem(userName: string, productId: number): Promise<void> {
        try {
            const user: User = await this.userService.findUser(userName);
            const userId: number = parseInt(user.userId!);

            await this.cartRepo.deleteCartItem(userId, productId);

        } catch (err) {
            if (err instanceof BaseError)
                throw err;
            L.error(`error removing from cart item productId: ${productId}, username : ${userName}`);
            throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }
    async addToCart(cartRequest: CartRequest, userName: string): Promise<void> {
        try {
            const user: User = await this.userService.findUser(userName);

            const userId: number = parseInt(user.userId!);
            await this.cartRepo.addToCart(userId, cartRequest);
        } catch (err) {
            if (err instanceof BaseError)
                throw err;
            L.error(err);
            throw new Error("Internal error adding to cart");
        }
    }
    async getCartDetails(userName: string): Promise<CartItem[]> {
        try {
            const user: User = await this.userService.findUser(userName);
            const userId: number = parseInt(user.userId!);

            return await this.cartRepo.getCartDetails(userId);
        } catch (err) {
            L.error(err);
            throw new Error("Internal error fetching cart details");
        }
    }
}
export default CartServiceImpl;