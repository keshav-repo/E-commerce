import { NextFunction, Request, Response } from "express";
import { Product } from "../model/product";
import { ProductService } from "../service/ProductService";
import L from "../helper/logger";
import { BadRequestError } from "../error/BadRequestError";
import { ResponseTypes } from "../config/ResponseTypes";
import { NotFoundError } from "../error/NotFoundError";
import { InternalServerError } from "../error/InternalServerError";
import { SuccessResponse } from "../response/SuccessResponse";
import { productSchema } from "../validation/productValidation";

class ProductController {
  private productService: ProductService;
  constructor(productService: ProductService) {
    this.productService = productService;
    this.fetchProduct = this.fetchProduct.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
  }
  public async fetchProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    const productId: string = req.query.productId as string;

    if (!productId) {
      return next(new BadRequestError(ResponseTypes.PRODUCT_ID_REQUIRED_FOUND.message, ResponseTypes.PRODUCT_ID_REQUIRED_FOUND.code));
    }

    try {
      const product = await this.productService.fetchProductById(parseInt(productId));
      if (product) {
        res.json(new SuccessResponse(ResponseTypes.PRODUCT_FETCHED, product));
      } else {
        return next(new NotFoundError(ResponseTypes.PRODUCT_NOT_FOUND.message, ResponseTypes.PRODUCT_NOT_FOUND.code,));
      }
    } catch (error) {
      return next(new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code));
    }
  }

  public async saveProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { error } = productSchema.validate(req.body);
    if (error) {
      L.error(error);
      return next(new BadRequestError(error.message, ResponseTypes.PRODUCT_ID_REQUIRED_FOUND.code));
    }

    const product: Product = req.body;
    try {
      const savedProduct = await this.productService.saveProduct(product);
      res.status(201).json(new SuccessResponse(ResponseTypes.PRODUCT_CREATED, savedProduct));
    } catch (error) {
      L.error(error);
      return next(new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code));
    }
  }
}
export default ProductController;
