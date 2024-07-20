import { Prisma } from "@prisma/client";

export default interface PaidOrderItem {
    product: {
        name: string;
    };
    quantity: number;
    price: Prisma.Decimal;
    productid: number;
    order: {
        createdat: Date;
    };
}
