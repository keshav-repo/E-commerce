import Stripe from "stripe";

const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY as string;

const stripe: Stripe = new Stripe(stripeSecretKey);

async function createWebhookEndpoint() {
    try {
        const endpoint = await stripe.webhookEndpoints.create({
            url: 'http://localhost:8080/api/payment/webhook',
            enabled_events: [
                'payment_intent.payment_failed',
                'payment_intent.succeeded',
            ],
        });
        console.log('Webhook endpoint created:', endpoint);
    } catch (error) {
        console.error('Error creating webhook endpoint:', error);
    }
}



export { stripe, createWebhookEndpoint };
