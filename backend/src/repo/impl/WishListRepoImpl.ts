import { PrismaClient } from "@prisma/client";
import L from "../../helper/logger";
import WishList from "../../model/wishlist";
import { Decimal } from "@prisma/client/runtime/library";
import { WishListRepo } from "../WishListRepo";

class WishListRepoImpl implements WishListRepo {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async addItemToWishlist(wishlist: WishList): Promise<void> {
        const userId: number = wishlist.userId,
            productId: number = wishlist.productId,
            name: string = wishlist.name,
            image: string = wishlist.image,
            price: Decimal = wishlist.price;

        try {
            await this.prisma.wishlist.create({
                data: {
                    userid: userId,
                    productid: productId,
                    name: name,
                    image: image,
                    price: price,
                },
            });
            L.info(`Product ${name} added to wishlist for user ${userId}`);
        } catch (error) {
            L.error(`Error adding product to wishlist for user ${userId}: ${error}`);
            throw new Error(`Failed to add product to wishlist for user ${userId}`);
        }
    }

    public async removeItemFromWishlist(userId: number, productId: number): Promise<void> {
        try {
            await this.prisma.wishlist.deleteMany({
                where: {
                    userid: userId,
                    productid: productId,
                },
            });
            L.info(`Product ${productId} removed from wishlist for user ${userId}`);
        } catch (error) {
            L.error(`Error removing product from wishlist for user ${userId}: ${error}`);
            throw new Error(`Failed to remove product from wishlist for user ${userId}`);
        }
    }
}

export default WishListRepoImpl;