import { NextFunction, Request, Response } from "express";
import { ProductByCategoryResponse } from "../response/ProductByCategoryResponse";
import { InternalServerError } from "../error/InternalServerError";
import { ResponseTypes } from "../config/ResponseTypes";
import { NotFoundError } from "../error/NotFoundError";
import { SuccessResponse } from "../response/SuccessResponse";
import { ProductService } from "../service/ProductService";

class HomePageController {
    private productService: ProductService;
    constructor(productService: ProductService) {
        this.productService = productService;
    }
    public getCategoryInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const list: ProductByCategoryResponse[] | null = await this.productService.getCategoryInfo();
            if (list) {
                const successResponse = new SuccessResponse(ResponseTypes.PRODUCT_FETCHED, list);
                res.json(successResponse);
            } else {
                return next(new NotFoundError(ResponseTypes.PRODUCT_NOT_FOUND.message, ResponseTypes.PRODUCT_NOT_FOUND.code,));
            }
        } catch (err) {
            return next(new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code));
        }
    }
}

export default HomePageController;