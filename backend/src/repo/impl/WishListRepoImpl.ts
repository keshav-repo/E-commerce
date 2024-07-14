import { PrismaClient } from "@prisma/client";
import L from "../../helper/logger";
import WishList from "../../model/wishlist";

import { WishListRepo } from "../WishListRepo";
import { BadRequestError } from "../../error/BadRequestError";
import { ResponseTypes } from "../../config/ResponseTypes";
import { use } from "passport";
import { BaseError } from "../../error/BaseError";

class WishListRepoImpl implements WishListRepo {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async addItemToWishlist(wishlist: WishList): Promise<void> {
        const userId: number = wishlist.userId,
            productId: number = wishlist.productId
        try {
            const wishes = await this.prisma.wishlist.findFirst({
                where: {
                    userid: userId,
                    productid: productId
                }
            })
            if (wishes) {
                throw new BadRequestError(ResponseTypes.PRODUCT_ALREADY_IN_WISHLIST.message, ResponseTypes.PRODUCT_ALREADY_IN_WISHLIST.code);
            }
            await this.prisma.wishlist.create({
                data: {
                    userid: userId,
                    productid: productId
                },
            });
        } catch (error) {
            if (error instanceof BadRequestError)
                throw error;

            L.error(`Error adding product to wishlist for user ${userId}: ${error}`);
            throw new Error(`Failed to add product to wishlist for user ${userId}`);
        }
    }

    public async removeItemFromWishlist(userId: number, productId: number): Promise<void> {
        try {
            const wish = await this.prisma.wishlist.findFirst({
                where: {
                    userid: userId,
                    productid: productId
                }
            });
            if (!wish) {
                throw new BadRequestError(ResponseTypes.PRODUCT_NOT_FOUND_IN_WISHLIST.message, ResponseTypes.PRODUCT_NOT_FOUND_IN_WISHLIST.code);
            }
            await this.prisma.wishlist.deleteMany({
                where: {
                    userid: userId,
                    productid: productId,
                },
            });
        } catch (error) {
            L.error(`Error removing product from wishlist for user ${userId}: ${error}`);

            if (error instanceof BaseError)
                throw error;

            throw new Error(`Failed to remove product from wishlist for user ${userId}`);
        }
    }
}

export default WishListRepoImpl;