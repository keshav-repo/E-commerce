import { it } from "node:test";
import { Order, OrderItem } from "../../model/Order";
import { User } from "../../model/User";
import { OrderRepo } from "../../repo/OrderRepo";

import PaymentService from "../PaymentService";
import { UserService } from "../UserService";
import { orderitems, orders } from "@prisma/client";
import { BaseError } from "../../error/BaseError";
import L from "../../helper/logger";
import { OrderRequest } from "../../request/OrderRequest";
import { OrderResponse } from "../../request/OrderResponse";
import CheckoutRequest from "../../request/CheckoutRequest";
import StripeSessionPayload from "../../model/StripeSessionData";
import { StripeService } from "../StripeService";
import Stripe from "stripe";
import { ResponseTypes } from "../../config/ResponseTypes";
import { InternalServerError } from "../../error/InternalServerError";
import SessionResponse from "../../response/SessionResponse";
import { OrderStatus } from "../../config";
import { use } from "passport";
import PaidOrderItem from "../../model/PaidOrderItem";
import OrderDetailsResponse from "../../response/OrderDetailResponse";

class PaymentServiceImpl implements PaymentService {
    private orderRepo: OrderRepo;
    private userService: UserService;
    private stripeService: StripeService;
    constructor(orderRepo: OrderRepo, userService: UserService, stripeService: StripeService) {
        this.orderRepo = orderRepo;
        this.userService = userService;
        this.stripeService = stripeService;
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
    async createSession(username: string, checkoutRequest: CheckoutRequest): Promise<SessionResponse> {
        try {
            const orderItemList: orderitems[] = await this.orderRepo.fetchOrderItem(checkoutRequest.orderId);

            let line_items = [];
            for (let orderItems of orderItemList) {
                const price = await this.stripeService.getPricing(orderItems.productid.toString());
                line_items.push({
                    price: price?.id,
                    quantity: orderItems.quantity
                })
            }

            const user: User = await this.userService.findUser(username);
            const customer: Stripe.Customer | null = await this.stripeService.getCustomer(user.email!);

            const checkoutPayload: StripeSessionPayload = {
                success_url: process.env.STRIPE_SUCCESS_URL!,
                cancel_url: process.env.STRIPE_CANCEL_URL!,
                line_items: line_items,
                mode: 'payment',
                customer: customer?.id!,
                payment_intent_data: {
                    metadata: {
                        orderId: checkoutRequest.orderId
                    }
                }
            };

            const session: Stripe.Checkout.Session = await this.stripeService.createSession(checkoutPayload);
            const response: SessionResponse = {
                id: session.id
            }
            return response;

        } catch (err) {
            L.error(`error creating session user: ${username}, checkout Req: ${JSON.stringify(checkoutRequest)} , error ${err}`)
            throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }

    async updateOrderToPaid(orderid: number): Promise<void> {
        try {
            await this.orderRepo.updateOrderStatus(orderid, OrderStatus.Paid);
        } catch (err) {
            L.error(`error updating order status to paid`);
            throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }

    async fetchOrderDetails(username: string): Promise<OrderDetailsResponse[]> {
        try {
            const user: User = await this.userService.findUser(username);
            const userId: number = parseInt(user.userId!);

            const orderItems: PaidOrderItem[] = await this.orderRepo.fetchOrderByUser(userId);

            const response: OrderDetailsResponse[] = [];
            for (let orderItem of orderItems) {
                response.push({
                    name: orderItem.product.name,
                    quantity: orderItem.quantity,
                    price: orderItem.price.toNumber(),
                    createdAt: orderItem.order.createdat,
                    productid: orderItem.productid
                })
            }
            return response;
        } catch (err) {
            L.error(`error fetching order details for username ${username}`);
            throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }

}

export default PaymentServiceImpl;