import { Decimal } from "@prisma/client/runtime/library";

export default interface CartItem {
    cartId: number,
    cartItemId: number,
    name: string,
    image: string,
    quantity: number,
    price: number,
    productId: number,
}
