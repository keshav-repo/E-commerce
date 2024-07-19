import { orderitems, orders } from "@prisma/client";
import { Order, OrderItem } from "../model/Order";

export interface OrderRepo {
    createOrder(order: Order): Promise<orders>;
    createOrderItem(item: OrderItem[]): Promise<orderitems[]>;
    updateOrderStatus(orderid: number, status: string): Promise<orders>;
    fetchOrderById(orderid: number): Promise<orders | null>;
    fetchOrderItem(orderid: number): Promise<orderitems[]>
}
