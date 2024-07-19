import { it } from "node:test";
import { Order, OrderItem } from "../../model/Order";
import { User } from "../../model/User";
import { OrderRepo } from "../../repo/OrderRepo";

import PaymentService from "../PaymentService";
import { UserService } from "../UserService";
import { orders } from "@prisma/client";
import { BaseError } from "../../error/BaseError";
import L from "../../helper/logger";
import { OrderRequest } from "../../request/OrderRequest";
import { OrderResponse } from "../../request/OrderResponse";

class PaymentServiceImpl implements PaymentService {
    private orderRepo: OrderRepo;
    private userService: UserService;
    constructor(orderRepo: OrderRepo, userService: UserService) {
        this.orderRepo = orderRepo;
        this.userService = userService;
    }

    async createOrder(username: string, orderRequest: OrderRequest): Promise<OrderResponse> {
        try {
            const user: User = await this.userService.findUser(username);

            const userId: number = parseInt(user.userId!);

            const orderReq: Order = {
                userid: userId,
                totalamount: orderRequest.totalPrice,
                status: 'PENDING'
            }
            const order: orders = await this.orderRepo.createOrder(orderReq);

            const orderItems: OrderItem[] = orderRequest.items.map(item => {
                return {
                    price: item.unitPrice,
                    quantity: item.quantity,
                    productid: item.productid,
                    orderid: order.orderid
                }
            });

            const orderItemList = await this.orderRepo.createOrderItem(orderItems);

            const orderResponse: OrderResponse = {
                orderId: order.orderid,
                status: order.status
            }
            return orderResponse

        } catch (err) {
            if (err instanceof BaseError)
                throw err;
            L.error(err);
            throw new Error("Internal error adding to cart");
        }
    }
}

export default PaymentServiceImpl;