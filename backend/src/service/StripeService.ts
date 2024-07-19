import Stripe from "stripe";

export interface StripeService {
    getPricing(productid: string): Promise<Stripe.Price>
}