import { Decimal } from "@prisma/client/runtime/library";

export default interface CartItem {
    cartId: number,
    cartItemId: number,
    name: string,
    image: string,
    quantity: number,
    price: Decimal,
    productId: number,
}

// export default interface Cart {
//     userId: number,
//     createdAt: Date,
//     updatedAt: Date,
//     cartItems: CartItem[]
// }
