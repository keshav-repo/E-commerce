import { db } from "../../db";
import { CartRepo } from "../CartRepo";

class CartRepoImpl implements CartRepo {

    constructor() {
    }

    public async addToCart(userId: number, productId: number, quantity: number) {
        try {
            await db.execute('BEGIN', []);

            let cart = await db.execute(`
                WITH existing_cart AS (
                    SELECT cart_id FROM carts WHERE user_id = $1
                ),
                new_cart AS (
                    INSERT INTO carts (user_id)
                    SELECT $1
                    WHERE NOT EXISTS (SELECT 1 FROM existing_cart)
                    RETURNING cart_id
                )
                SELECT cart_id FROM existing_cart
                UNION ALL
                SELECT cart_id FROM new_cart;
            `, [userId]);

            const cartId = cart.rows[0].cart_id;
            await db.execute(`
                INSERT INTO cart_items (cart_id, product_id, quantity, price)
                VALUES ($1, $2, $3, (SELECT price FROM products WHERE product_id = $2))
                ON CONFLICT (cart_id, product_id) DO UPDATE
                SET quantity = cart_items.quantity + EXCLUDED.quantity, updated_at = CURRENT_TIMESTAMP;
            `, [cartId, productId, quantity]);

            await db.execute('COMMIT', []);
        } catch (error) {
            await db.execute('ROLLBACK', []);
            console.error(error);
        }
    };

}