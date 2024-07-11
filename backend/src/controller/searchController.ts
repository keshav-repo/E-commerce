import { NextFunction, Request, Response, query } from "express";
import { SearchService } from "../service/SearchService";
import { BadRequestError } from "../error/BadRequestError";
import { ResponseTypes } from "../config/ResponseTypes";
import { InternalServerError } from "../error/InternalServerError";
import { SuccessResponse } from "../response/SuccessResponse";
import { NotFoundError } from "../error/NotFoundError";
import { SearchResult, EsQuery } from "../response/AggregationResponse";
import L from "../helper/logger";

class SearchController {
    private searchService: SearchService;
    constructor(searchService: SearchService) {
        this.searchService = searchService;
        this.searchProduct = this.searchProduct.bind(this);
    }
    public async searchProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        const encodedQuery: string = req.query.query as string;
        let esQuery: string = decodeURIComponent(encodedQuery);
        esQuery = esQuery.replace(/'/g, '"');
        try {
            var query: EsQuery = JSON.parse(esQuery);
        } catch (err) {
            L.error('error parsing json')
            return next(new BadRequestError(ResponseTypes.BAD_REQUEST.message, ResponseTypes.BAD_REQUEST.code));
        }
        const page: string = req.query.page as string;
        const size: string = req.query.size as string;
        if (!query) {
            return next(new BadRequestError(ResponseTypes.EMPTY_PRODUCT_QUERY.message, ResponseTypes.PRODUCT_ID_REQUIRED_FOUND.code));
        }
        try {
            const product: SearchResult | null = await this.searchService.searchProduct(query, page ? parseInt(page) : undefined, size ? Number(size) : undefined);
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