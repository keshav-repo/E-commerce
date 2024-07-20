import { orderitems, orders } from "@prisma/client";
import { Order, OrderItem } from "../model/Order";
import PaidOrderItem from "../model/PaidOrderItem";

export interface OrderRepo {
    createOrder(order: Order): Promise<orders>;
    createOrderItem(item: OrderItem[]): Promise<orderitems[]>;
    updateOrderStatus(orderid: number, status: string): Promise<orders>;
    fetchOrderById(orderid: number): Promise<orders | null>;
    fetchOrderItemByOrderid(orderid: number): Promise<PaidOrderItem[]>
    fetchOrderItem(orderid: number): Promise<orderitems[]>;
    fetchOrderByUser(userId: number): Promise<PaidOrderItem[]>
}
