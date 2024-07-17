import Stripe from "stripe";

const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY as string;

const stripe: Stripe = new Stripe(stripeSecretKey);

const endpoint = stripe.webhookEndpoints.create({
    url: 'https://example.com/my/webhook/endpoint',
    enabled_events: [
        'payment_intent.payment_failed',
        'payment_intent.succeeded',
    ],
});

export default stripe;
