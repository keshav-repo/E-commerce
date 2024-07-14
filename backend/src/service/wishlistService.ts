import WishList from "../model/wishlist";
import WishListRequest from "../request/WishListRequest";

export interface WishListService {
    addItemToWishlist(username: string, wishListRequest: WishListRequest): Promise<void>;
    removeItemFromWishlist(username: string, productId: number): Promise<void>;
    fetchWishList(username: string): Promise<WishList[]>;
}
