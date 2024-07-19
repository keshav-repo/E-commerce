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

class PaymentController {
    private paymentService: PaymentService;

    constructor(paymentService: PaymentService) {
        this.paymentService = paymentService;
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

    public stripeWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const sig = req.headers['stripe-signature'] as string;
        let event: Stripe.Event;

        const STRIPE_WEBHOOK_SECRET: string = process.env.STRIPE_WEBHOOK_SECRET!;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
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

        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;

                const { orderId } = paymentIntent.metadata;

                const paymentData = {
                    payment_intent_id: paymentIntent.id,
                    stripeCustomerId: paymentIntent.customer,
                    payment_method: paymentIntent.payment_method,
                    amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                    status: paymentIntent.status,
                    createdTime: paymentIntent.created,
                    completedTime: paymentIntent.status === 'succeeded' ? Date.now() : null,
                };

                L.info('payment data is');
                L.info(JSON.stringify(paymentData));

                await this.paymentService.updateOrderToPaid(parseInt(orderId));

                break;
            case 'payment_intent.payment_failed':
                const paymentIntent_failed = event.data.object;

                L.info(`payment intetent failed`, paymentIntent_failed);

                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    }
}

export default PaymentController;