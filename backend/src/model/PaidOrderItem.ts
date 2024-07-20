import { Prisma } from "@prisma/client";

export default interface PaidOrderItem {
    product: {
        name: string;
        images: Prisma.JsonValue,
    };
    quantity: number;
    price: Prisma.Decimal;
    productid: number;
    order: {
        createdat: Date;
        status: string
    };
}
