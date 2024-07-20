import { Prisma, PrismaClient, orderitems, orders } from "@prisma/client";
import { OrderRepo } from "../OrderRepo";
import L from "../../helper/logger";
import { Order, OrderItem } from "../../model/Order";
import { use } from "passport";
import { OrderStatus } from "../../config";
import PaidOrderItem from "../../model/PaidOrderItem";

class OrderRepoImpl implements OrderRepo {
    private prisma: PrismaClient;
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }
    public createOrder = async (order: Order): Promise<orders> => {
        try {
            const orders: orders = await this.prisma.orders.create({
                data: {
                    userid: order.userid,
                    totalamount: order.totalamount,
                    status: order.status
                }
            });
            return orders;
        } catch (err) {
            L.error(`error creating order ${err}`)
            throw new Error("Error creating orders");
        }
    }
    public updateOrderStatus = async (orderid: number, status: string): Promise<orders> => {
        try {
            const updatedOrder = await this.prisma.orders.update({
                where: { orderid: orderid },
                data: {
                    status: status
                }
            });
            return updatedOrder;
        } catch (err) {
            L.error(`error updating order status ${err}`);
            throw new Error("error updating order status");
        }
    }
    public createOrderItem = async (item: OrderItem[]): Promise<orderitems[]> => {
        try {
            const orderItemList: orderitems[] = await this.prisma.orderitems.createManyAndReturn({
                data: item.map(item => ({
                    price: item.price,
                    quantity: item.quantity,
                    productid: item.productid,
                    orderid: item.orderid
                })),
                skipDuplicates: true
            });
            return orderItemList;
        } catch (err) {
            L.error(`error creating order item ${err}`);
            throw new Error("error creating order item");
        }
    }
    public fetchOrderById = async (orderid: number): Promise<orders | null> => {
        try {
            const order: orders | null = await this.prisma.orders.findFirst({
                where: {
                    orderid: orderid
                }
            })
            return order;
        } catch (err) {
            L.error(`error fetching orderId: ${orderid}, error ${err}`);
            throw new Error("error fetching orderId");
        }
    }
    public fetchOrderItem = async (orderid: number): Promise<orderitems[]> => {
        try {
            const order: orderitems[] = await this.prisma.orderitems.findMany({
                where: {
                    orderid: orderid
                }
            });
            return order;
        } catch (err) {
            L.error(`error fetching order item: ${orderid}, error ${err}`);
            throw new Error("error fetching order item");
        }
    }
    public fetchOrderByUser = async (userId: number): Promise<PaidOrderItem[]> => {
        try {
            const paidOrderItems: PaidOrderItem[] = await this.prisma.orderitems.findMany({
                where: {
                    order: {
                        status: OrderStatus.Paid,
                        userid: userId
                    },
                },
                select: {
                    product: {
                        select: {
                            name: true,
                        },
                    },
                    quantity: true,
                    price: true,
                    productid: true,
                    order: {
                        select: {
                            createdat: true
                        }
                    }
                },
            });
            return paidOrderItems;
        } catch (err) {
            L.error(`error fetching order information with userid: ${userId} and error ${err}`)
            throw new Error("error fetching order by user");
        }
    }
}

export default OrderRepoImpl;
