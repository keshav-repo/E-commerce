import { db } from "../../db";
import { CartRepo } from "../CartRepo";
import L from "../../helper/logger";

class CartRepoImpl implements CartRepo {

    constructor() { }

    public addToCart = async (userId: number, productId: number, quantity: number): Promise<void> => {
        let cartId: number;

        try {
            const cart = await db.execute('SELECT cartId FROM carts WHERE userId = $1', [userId]);
            if (cart.rows.length === 0) {
                const newCart = await db.execute('INSERT INTO carts (userId) VALUES ($1) RETURNING cartId', [userId]);
                cartId = newCart.rows[0].cartid;
            } else {
                cartId = cart.rows[0].cartid;
            }
        } catch (error) {
            L.error(`Error fetching or creating cart for user ${userId}: ${error}`);
            throw new Error(`Failed to fetch or create cart for user ${userId}`);
        }

        try {
            const cartItem = await db.execute('SELECT cartItemId, quantity FROM cartItems WHERE cartId = $1 AND productId = $2', [cartId, productId]);

            if (cartItem.rows.length === 0) {
                await db.execute(
                    'INSERT INTO cartItems (cartId, productId, quantity, price) VALUES ($1, $2, $3, (SELECT price FROM product WHERE productId = $2))',
                    [cartId, productId, quantity]
                );
            } else {
                await db.execute(
                    'UPDATE cartItems SET quantity = quantity + $1, updatedAt = CURRENT_TIMESTAMP WHERE cartItemId = $2',
                    [quantity, cartItem.rows[0].cartitemid]
                );
            }
        } catch (error) {
            L.error(`Error adding product ${productId} to cart ${cartId} for user ${userId}: ${error}`);
            throw new Error(`Failed to add product ${productId} to cart for user ${userId}`);
        }
    }
}

export default CartRepoImpl;
