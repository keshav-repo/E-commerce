
import { CartRepo } from "../../repo/CartRepo";
import { CartRequest } from "../../request/CartRequest";
import { CartService } from "../CartService";
import { User } from "../../model/User";
import { UserService } from "../UserService";
import L from "../../helper/logger";
import CartItem from "../../model/cart";

class CartServiceImpl implements CartService {
    private cartRepo: CartRepo;
    private userService: UserService;
    constructor(cartRepo: CartRepo, userService: UserService) {
        this.cartRepo = cartRepo;
        this.userService = userService;
        this.addToCart = this.addToCart.bind(this);
    }
    async addToCart(cartRequest: CartRequest, userName: string): Promise<void> {
        try {
            const user: User = await this.userService.findUser(userName);

            const userId: number = parseInt(user.userId!);
            this.cartRepo.addToCart(userId, cartRequest);
        } catch (err) {
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