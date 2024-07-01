import { Request, Response } from "express";
import { Product } from "../model/product";
import { ProductService } from "../service/ProductService";
import L from "../helper/logger";

class ProductController {
  private productService: ProductService;
  constructor(productService: ProductService) {
    this.productService = productService;
    this.fetchProduct = this.fetchProduct.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
  }
  public async fetchProduct(req: Request, res: Response): Promise<void> {
    const productId: string = req.query.productId as string;

    if (!productId) {
      res.status(400).json({ message: 'Product ID is required' });
      return;
    }

    try {
      const product = await this.productService.fetchProductById(parseInt(productId));
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Some temporary error' });
    }
  }

  public async saveProduct(req: Request, res: Response): Promise<void> {
    const product: Product = req.body;
    try {
      const savedProduct = await this.productService.saveProduct(product);
      res.status(201).json(savedProduct);
    } catch (error) {
      L.error(error);
      res.status(500).json({ message: 'Internal error' });
    }

  }

}
export default ProductController;
