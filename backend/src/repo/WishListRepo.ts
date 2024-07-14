import WishList from "../model/wishlist";

export interface WishListRepo {
    addItemToWishlist(wishlist: WishList): Promise<void>;
    removeItemFromWishlist(userId: number, productId: number): Promise<void>;
}