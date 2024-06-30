import { Request, Response } from "express";
import { Product } from "../model/product";

class ProductController {
  constructor() {}
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
}
export default ProductController;
