import { NextFunction, Request, Response } from "express";
import { SearchService } from "../service/SearchService";
import { BadRequestError } from "../error/BadRequestError";
import { ResponseTypes } from "../config/ResponseTypes";
import { InternalServerError } from "../error/InternalServerError";
import { Product } from "../model/product";
import { SuccessResponse } from "../response/SuccessResponse";
import { NotFoundError } from "../error/NotFoundError";

class SearchController {
    private searchService: SearchService;
    constructor(searchService: SearchService) {
        this.searchService = searchService;
        this.searchProduct = this.searchProduct.bind(this);
    }
    public async searchProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        const query: string = req.query.query as string;
        const page: string = req.query.page as string;
        const size: string = req.query.size as string;
        if (!query || !page || !size) {
            return next(new BadRequestError(ResponseTypes.EMPTY_PRODUCT_QUERY.message, ResponseTypes.PRODUCT_ID_REQUIRED_FOUND.code));
        }
        try {
            const product: Product[] | null = await this.searchService.searchProduct(query, Number(page), Number(size));
            if (product) {
                res.json(new SuccessResponse(ResponseTypes.SEARCH_SUCCESS, product));
            } else {
                return next(new NotFoundError(ResponseTypes.PRODUCT_NOT_FOUND.message, ResponseTypes.PRODUCT_NOT_FOUND.code,));
            }
        } catch (err) {
            return next(new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code));
        }
    }
}

export default SearchController;