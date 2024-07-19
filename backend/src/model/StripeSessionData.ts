import Stripe from "stripe";

export default interface StripeSessionPayload {
    success_url: string,
    cancel_url: string,
    line_items: any[],
    mode: Stripe.Checkout.SessionCreateParams.Mode,
    customer: string,
    payment_intent_data: any
}
