import { OrderRequest } from "../request/OrderRequest";
import { OrderResponse } from "../request/OrderResponse";

export default interface PaymentService {
    createOrder(username: string, orderRequest: OrderRequest): Promise<OrderResponse>;
}
