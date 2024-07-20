import Stripe from "stripe";
import CheckoutRequest from "../request/CheckoutRequest";
import { OrderRequest } from "../request/OrderRequest";
import { OrderResponse } from "../request/OrderResponse";
import OrderDetailsResponse from "../response/OrderDetailResponse";
import SessionResponse from "../response/SessionResponse";

export default interface PaymentService {
    createOrder(username: string, orderRequest: OrderRequest): Promise<OrderResponse>;
    createSession(username: string, checkoutRequest: CheckoutRequest): Promise<SessionResponse>;
    updateOrderToPaid(orderid: number): Promise<void>;
    fetchOrderDetails(username: string): Promise<any>;
    fetchOrderDetailsByOrderId(orderId: number): Promise<OrderDetailsResponse[]>;
    processStripeEvent(event: Stripe.Event): Promise<void>;
}
