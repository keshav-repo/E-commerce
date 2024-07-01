import { Client } from "pg";
import { ProductRepo } from "../ProductRepo";
import L from "../../helper/logger";
import { ProductEntity } from "../../entity/ProductEntity";

class ProductRepoImpl implements ProductRepo {
    private client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    async findByProductId(productId: Number): Promise<ProductEntity | null> {
        const query = "SELECT * FROM products WHERE product_id = $1";
        const values = [productId];

        try {
            const res = await this.client.query(query, values);
            if (res.rows.length > 0) {
                const row = res.rows[0];
                return {
                    productId: row.product_id,
                    name: row.name,
                    description: row.description,
                    price: row.price,
                    category: row.category,
                };
            } else {
                return null;
            }
        } catch (error) {
            L.error(error);
            throw new Error(`Unable to find product by ID ${productId}`);
        }
    }
    async save(product: ProductEntity): Promise<ProductEntity> {
        const query = `
                INSERT INTO product (name, description, price, category)
                VALUES ($1, $2, $3, $4)
                 RETURNING product_id, name, description, price, category
            `;
        const values = [
            product.name,
            product.description,
            product.price,
            product.category,
        ];
        try {
            const res = await this.client.query(query, values);
            const savedProduct = res.rows[0];
            return {
                productId: savedProduct.product_id,
                name: savedProduct.name,
                description: savedProduct.description,
                price: savedProduct.price,
                category: savedProduct.category,
            };
        } catch (error) {
            L.error(error);
            throw new Error(`Unable to save product`);
        }
    }
}

export default ProductRepoImpl;
