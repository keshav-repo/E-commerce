import { NextFunction, Request, Response } from "express";
import { CartRequest } from "../request/CartRequest";
import { BadRequestError } from "../error/BadRequestError";
import { ResponseTypes } from "../config/ResponseTypes";
import { CartService } from "../service/CartService";
import CartItem from "../model/cart";
import { SuccessResponse } from "../response/SuccessResponse";
import { CartRequestValidation } from "../validation/cartRequestValidation";

class CartController {

    private cartService: CartService;
    constructor(cartService: CartService) {
        this.cartService = cartService;
    }

    public addToCart = async (req: Request<{}, {}, CartRequest, {}>, res: Response, next: NextFunction): Promise<void> => {
        const cartRequest: CartRequest = req.body;

        const { error } = CartRequestValidation.validate(cartRequest);
        if (error) {
            return next(new BadRequestError(error.details[0].message, ResponseTypes.INVALID_CART_REQUEST.code));
        }

        if (!(req as any).currUser) {
            next(new BadRequestError(ResponseTypes.BAD_REQUEST.message, ResponseTypes.BAD_REQUEST.code));
        }
        const currUser: string = (req as any).currUser.username;
        try {
            await this.cartService.addToCart(cartRequest, currUser);
            res.status(201).json(new SuccessResponse(ResponseTypes.ADDED_TO_CART));
        } catch (err) {
            next(err);
        }
    }

    public fetchCartDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const currUser: string = (req as any).currUser.username;
        try {
            const cartItems: CartItem[] = await this.cartService.getCartDetails(currUser);
            res.json(new SuccessResponse(ResponseTypes.CART_ITEM_FETCHED, cartItems));
        } catch (err) {
            next(err)
        }
    }

    public deleteCartItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const currUser: string = (req as any).currUser.username;
        const pid: string = req.query.productId as string;
        const productId: number = parseInt(pid);
        try {
            await this.cartService.deleteCartItem(currUser, productId);
            res.json(new SuccessResponse(ResponseTypes.CART_ITEM_DELETED));
        } catch (err) {
            next(err);
        }
    }
}
export default CartController;
