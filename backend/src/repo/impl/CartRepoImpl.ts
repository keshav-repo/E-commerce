import { CartRepo } from "../CartRepo";
import L from "../../helper/logger";
import { PrismaClient, cartitems } from "@prisma/client";
import CartItem from "../../model/cart";
import { CartRequest } from "../../request/CartRequest";
import { CONSTANTS } from "../../config";
import { Query } from "pg";
import { BadRequestError } from "../../error/BadRequestError";
import { ResponseTypes } from "../../config/ResponseTypes";

class CartRepoImpl implements CartRepo {

    private prisma: PrismaClient;
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public addToCart = async (userId: number, cartRequest: CartRequest): Promise<void> => {
        let cartId: number;

        const productId: number = cartRequest.productId,
            quantity: number = cartRequest.quantity,
            operation: string = cartRequest.operation;

        try {

            const cart = await this.prisma.carts.findFirst({
                where: { userid: userId }
            });
            if (!cart) {
                const newCart = await this.prisma.carts.create({
                    data: { userid: userId }
                });
                cartId = newCart.cartid;
            } else {
                cartId = cart.cartid;
            }
        } catch (error) {
            L.error(`Error fetching or creating cart for user ${userId}: ${error}`);
            throw new Error(`Failed to fetch or create cart for user ${userId}`);
        }

        try {
            const cartItem = await this.prisma.cartitems.findFirst({
                where: {
                    cartid: cartId,
                    productid: productId
                }
            });
            if (!cartItem) {
                if (operation == CONSTANTS.INC_QUANTITY) {
                    const product = await this.prisma.product.findUnique({
                        where: { productid: productId }
                    });
                    if (!product) {
                        throw new Error(`Product with ID ${productId} not found`);
                    }
                    await this.prisma.cartitems.create({
                        data: {
                            cartid: cartId,
                            productid: productId,
                            quantity: quantity,
                            price: product.price
                        }
                    });
                }
            } else {
                if (operation == CONSTANTS.INC_QUANTITY)
                    await this.prisma.cartitems.update({
                        where: { cartitemid: cartItem.cartitemid },
                        data: {
                            quantity: cartItem.quantity + quantity,
                            updatedat: new Date()
                        }
                    });
                else {
                    console.log(cartItem);
                    if (cartItem.quantity <= 0) {
                        throw new BadRequestError(ResponseTypes.BAD_REQUEST.message, ResponseTypes.BAD_REQUEST.code);
                    }
                    const newQuantity = cartItem.quantity - quantity;
                    if (newQuantity <= 0) {
                        await this.prisma.cartitems.delete({
                            where: { cartitemid: cartItem.cartitemid }
                        });
                    } else {
                        await this.prisma.cartitems.update({
                            where: { cartitemid: cartItem.cartitemid },
                            data: {
                                quantity: newQuantity,
                                updatedat: new Date()
                            }
                        });
                    }
                }
            }
        } catch (error) {
            L.error(`Error adding product ${productId} to cart ${cartId} for user ${userId}: ${error}`);
            throw new Error(`Failed to add product ${productId} to cart for user ${userId}`);
        }
    }

    public getCartDetails = async (userId: number): Promise<CartItem[]> => {
        try {
            const cart = await this.prisma.carts.findFirst({
                where: { userid: userId },
                select: { cartid: true }
            });

            if (!cart) {
                throw new Error(`No cart found for user with ID ${userId}`);
            }

            const cartDetails = await this.prisma.cartitems.findMany({
                where: { cartid: cart.cartid },
                include: {
                    product: true
                }
            });

            const cartItemList: CartItem[] = cartDetails.map(item => {
                const images = item.product.images as unknown as string[];
                return {
                    cartId: item.cartid,
                    cartItemId: item.cartitemid,
                    name: item.product.name,
                    image: images[0],
                    quantity: item.quantity,
                    price: item.price,
                    productId: item.productid
                };
            });
            return cartItemList;

        } catch (error) {
            L.error(`Error fetching cart details for user ${userId}: ${error}`);
            throw new Error(`Failed to fetch cart details for user ${userId}`);
        }
    }
}

export default CartRepoImpl;
