import { NextFunction, Request, Response } from "express";
import { stripe } from "../middleware";
import L from "../helper/logger";

class PaymentController {
    constructor() {
    }
    public checkout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // const session = await stripe.checkout.sessions.create({
        //     success_url: 'https://example.com/success',
        //     line_items: [
        //         {
        //             price: 'price_1MotwRLkdIwHu7ixYcPLm5uZ',
        //             quantity: 2,
        //         },
        //     ],
        //     mode: 'payment',
        // });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: 'Product 1',
                        },
                        unit_amount: 200,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        L.info('session id is ', session.id);

        res.json({ id: session.id });
    }
}

export default PaymentController;