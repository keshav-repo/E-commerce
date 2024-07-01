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
    const products: Product[] = [
      {
        productId: "1",
        name: "Laptop",
        description: "A high-performance laptop for all your computing needs.",
        price: 999.99,
        category: "Electronics",
      },
      {
        productId: "2",
        name: "Smartphone",
        description:
          "A sleek smartphone with the latest features and a powerful camera.",
        price: 799.99,
        category: "Electronics",
      },
    ];
    res.json(products);
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
