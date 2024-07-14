import { use } from "passport";
import WishList from "../../model/wishlist";
import { WishListRepo } from "../../repo/WishListRepo";
import { UserService } from "../UserService";
import { WishListService } from "../wishlistService";
import WishListRequest from "../../request/WishListRequest";
import { User } from "../../model/User";
import { InternalServerError } from "../../error/InternalServerError";
import { ResponseTypes } from "../../config/ResponseTypes";
import L from "../../helper/logger";
import { BaseError } from "../../error/BaseError";

class WishListServiceImpl implements WishListService {
    private wishListRepo: WishListRepo;
    private userService: UserService;
    constructor(wishListRepo: WishListRepo, userService: UserService) {
        this.wishListRepo = wishListRepo;
        this.userService = userService;
    }
    async addItemToWishlist(username: string, wishListRequest: WishListRequest): Promise<void> {
        try {
            const user: User = await this.userService.findUser(username);
            const wishlist: WishList = {
                productId: wishListRequest.productId,
                userId: parseInt(user.userId!)
            }
            await this.wishListRepo.addItemToWishlist(wishlist);
        } catch (err) {
            if (err instanceof BaseError)
                throw err;
            L.error(`error adding item to wishlist with userName: ${username} and wishListRequest ${JSON.stringify(wishListRequest)} with error ${err}`);
            throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }
    removeItemFromWishlist(userId: number, productId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    fetchWishList(username: string): Promise<WishList[]> {
        throw new Error("Method not implemented.");
    }
}
export default WishListServiceImpl;