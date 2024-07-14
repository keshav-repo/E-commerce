import { Decimal } from "@prisma/client/runtime/library";

export default interface WishList {
    name: string,
    image: string,
    price: Decimal,
    productId: number,
    userId: number
}
