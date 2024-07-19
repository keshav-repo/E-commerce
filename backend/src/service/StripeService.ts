import Stripe from "stripe";
import StripeSessionPayload from "../model/StripeSessionData";

export interface StripeService {
    getPricing(productid: string): Promise<Stripe.Price | null>;
    getCustomer(emailId: string): Promise<Stripe.Customer | null>;
    createCustomer(emailId: string): Promise<Stripe.Customer>;
    createSession(sessionPayload: StripeSessionPayload): Promise<Stripe.Checkout.Session>
}