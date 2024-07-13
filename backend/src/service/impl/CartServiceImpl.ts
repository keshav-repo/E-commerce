
import { CartRepo } from "../../repo/CartRepo";
import { CartRequest } from "../../request/CartRequest";
import { CartService } from "../CartService";
import { User } from "../../model/User";
import { UserService } from "../UserService";
import L from "../../helper/logger";

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
            this.cartRepo.addToCart(userId, cartRequest.productId, cartRequest.quantity);
        } catch (err) {
            L.error(err);
            throw new Error("Internal error adding to cart");
        }
    }
}
export default CartServiceImpl;