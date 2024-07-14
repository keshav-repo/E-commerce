import { ProductRepo } from "../ProductRepo";
import L from "../../helper/logger";
import { ProductEntity } from "../../entity/ProductEntity";
import { db } from "../../db";
import { ProductByCategoryResponse } from "../../response/ProductByCategoryResponse";

class ProductRepoImpl implements ProductRepo {

    constructor() {
        this.save = this.save.bind(this);
        this.findByProductId = this.findByProductId.bind(this);
    }

    async findByProductId(productId: Number): Promise<ProductEntity | null> {
        const query = "SELECT * FROM product WHERE productid = $1";
        const values = [productId];

        try {
            const res = await db.execute(query, values);
            if (res.rows.length > 0) {
                const row = res.rows[0];
                const productEntity: ProductEntity = {
                    productId: row.product_id,
                    name: row.name,
                    description: row.description,
                    price: row.price,
                    category: row.category,
                    company: row.company,
                    additionalInfo: row.additional_info ? row.additional_info : undefined,
                    createdAt: row.created_at,
                    updatedAt: row.updated_at,
                    images: row.images ? row.images : undefined,
                }
                return productEntity;
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
            INSERT INTO product (name, description, price, category, company, additional_info, images, gender)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING product_id, name, description, price, category, company, additional_info, created_at, updated_at, images, gender
        `;
        const values = [
            product.name,
            product.description,
            product.price,
            product.category,
            product.company,
            product.additionalInfo ? JSON.stringify(product.additionalInfo) : null,
            product.images ? JSON.stringify(product.images) : null,
            product.gender
        ];
        try {
            const res = await db.execute(query, values);
            const savedProduct = res.rows[0];
            return {
                productId: savedProduct.product_id,
                name: savedProduct.name,
                description: savedProduct.description,
                price: savedProduct.price,
                category: savedProduct.category,
                company: savedProduct.company,
                additionalInfo: savedProduct.additional_info ? savedProduct.additional_info : undefined,
                createdAt: savedProduct.created_at,
                updatedAt: savedProduct.updated_at,
                images: savedProduct.images ? savedProduct.images : undefined,
            };
        } catch (error) {
            L.error(error);
            throw new Error(`Unable to save product in db`);
        }
    }

    async findProductBriefByCategory(): Promise<ProductByCategoryResponse[] | null> {
        const query = "SELECT DISTINCT ON (category) name, images->0 AS first_image, category FROM product";
        const values: any[] = [];

        try {
            const res = await db.execute(query, values);
            const productByCategoryResponseArr: ProductByCategoryResponse[] = [];
            res.rows.forEach(row => {
                const item: ProductByCategoryResponse = {
                    imgSrc: row.first_image,
                    title: row.category
                }
                productByCategoryResponseArr.push(item);
            });

            return productByCategoryResponseArr;
        } catch (error) {
            L.error(error);
            throw new Error(`Unable to find product by ID`);
        }
    }
}

export default ProductRepoImpl;
