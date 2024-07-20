import { NextFunction, Request, Response } from "express";
import { stripe } from "../middleware";
import L from "../helper/logger";
import Stripe from "stripe";
import { OrderRequest } from "../request/OrderRequest";
import PaymentService from "../service/PaymentService";
import { OrderResponse } from "../request/OrderResponse";
import { SuccessResponse } from "../response/SuccessResponse";
import { ResponseTypes } from "../config/ResponseTypes";
import CheckoutRequest from "../request/CheckoutRequest";
import OrderDetailsResponse from "../response/OrderDetailResponse";
import { StripeService } from "../service/StripeService";
import { StripeEventsType } from "../config";

class PaymentController {
    private paymentService: PaymentService;
    private stripeService: StripeService;

    constructor(paymentService: PaymentService, stripeService: StripeService) {
        this.paymentService = paymentService;
        this.stripeService = stripeService;
    }

    public createOrder = async (req: Request<{}, {}, OrderRequest>, res: Response, next: NextFunction): Promise<void> => {
        const paymentRequest: OrderRequest = req.body;

        try {
            const currUser: string = (req as any).currUser.username;
            const orderResponse: OrderResponse = await this.paymentService.createOrder(currUser, paymentRequest);
            res.status(201).json(new SuccessResponse(ResponseTypes.ORDER_CREATED, orderResponse));
        } catch (err) {
            next(err);
        }
    }

    public checkout = async (req: Request<{}, {}, CheckoutRequest>, res: Response, next: NextFunction): Promise<void> => {
        const checkoutRequest: CheckoutRequest = req.body;
        try {
            const currUser: string = (req as any).currUser.username;
            const sessionResponse = await this.paymentService.createSession(currUser, checkoutRequest);
            res.status(201).json(new SuccessResponse(ResponseTypes.SESSION_CREATED, sessionResponse));
        } catch (err) {
            next(err);
        }
    }

    public fetchOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const currUser: string = (req as any).currUser.username;
            const oid = req.query.orderId as string;
            if (oid) {
                const orderId = parseInt(oid);
                var response: OrderDetailsResponse[] = await this.paymentService.fetchOrderDetailsByOrderId(orderId);
            } else {
                var response: OrderDetailsResponse[] = await this.paymentService.fetchOrderDetails(currUser);
            }
            res.json(new SuccessResponse(ResponseTypes.ORDER_DETAIL_FETCHED, response));
        } catch (err) {
            next(err);
        }
    }

    public stripeWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const sig = req.headers['stripe-signature'] as string;
        let event: Stripe.Event;

        try {
            event = this.stripeService.constructEvent(req.body, sig);
        }
        catch (err) {
            if (err instanceof Error) {
                L.error(err.message);
                res.status(400).send(`Webhook Error: ${(err as Error).message}`);
            } else {
                L.error(err);
                res.status(400).send(`Webhook Error`);
            }
            return;
        }

        // switch (event.type) {
        //     case StripeEventsType.SUCCEEDED:
        //         const paymentIntent = event.data.object;

        //         const { orderId } = paymentIntent.metadata;

        //         const paymentData = {
        //             payment_intent_id: paymentIntent.id,
        //             stripeCustomerId: paymentIntent.customer,
        //             payment_method: paymentIntent.payment_method,
        //             amount: paymentIntent.amount,
        //             currency: paymentIntent.currency,
        //             status: paymentIntent.status,
        //             createdTime: paymentIntent.created,
        //             completedTime: paymentIntent.status === 'succeeded' ? Date.now() : null,
        //         };

        //         L.info('payment data is');
        //         L.info(JSON.stringify(paymentData));

        //         await this.paymentService.updateOrderToPaid(parseInt(orderId));

        //         break;
        //     case StripeEventsType.FAILED:
        //         const paymentIntent_failed = event.data.object;

        //         L.info(`payment intetent failed`, paymentIntent_failed);

        //         break;
        //     default:
        //         console.log(`Unhandled event type ${event.type}`);
        // }

        try {
            this.paymentService.processStripeEvent(event);
        } catch (err) {
            L.error(`error processing stripe webhook ${err}`);
        }

        res.json({ received: true });
    }
}

export default PaymentController;