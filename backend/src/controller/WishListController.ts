import { NextFunction, Request, Response } from "express";
import { WishListService } from "../service/wishlistService";
import WishListRequest from "../request/WishListRequest";
import { SuccessResponse } from "../response/SuccessResponse";
import { ResponseTypes } from "../config/ResponseTypes";

class WishListController {
    private wishListService: WishListService;
    constructor(wishListService: WishListService) {
        this.wishListService = wishListService;
    }
    public addToWishList = async (req: Request<{}, {}, WishListRequest>, res: Response, next: NextFunction): Promise<void> => {
        const wishListRequest: WishListRequest = req.body;
        try {
            const currUser: string = (req as any).currUser.username;
            await this.wishListService.addItemToWishlist(currUser, wishListRequest);
            res.status(201).json(new SuccessResponse(ResponseTypes.WISHLIST_CREATED));
        } catch (err) {
            next(err);
        }
    }
}

export default WishListController;