import Stripe from "stripe";
import { StripeService } from "../StripeService";
import { ResponseTypes } from "../../config/ResponseTypes";
import { StripeError } from "../../error/StripeError";
import { InternalServerError } from "../../error/InternalServerError";
import L from "../../helper/logger";
import StripeSessionPayload from "../../model/StripeSessionData";
import session from "express-session";

class StripeServiceImpl implements StripeService {
    private stripe: Stripe;
    constructor(stripe: Stripe) {
        this.stripe = stripe;
    }
    public async getPricing(productid: string): Promise<Stripe.Price | null> {
        try {
            const prices: Stripe.ApiList<Stripe.Price> = await this.stripe.prices.list({
                product: productid,
                active: true
            });
            if (prices.data.length > 0) {
                const price: Stripe.Price = prices.data[0];
                return price;
            } else {
                return null
            }
        } catch (err) {
            L.error(`error fetching stripe price for productid ${productid}`)
            if (err instanceof StripeError)
                throw err;
            else
                throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }
    public async getCustomer(emailId: string): Promise<Stripe.Customer | null> {
        try {
            const customer: Stripe.ApiSearchResult<Stripe.Customer> = await this.stripe.customers.search({
                query: `email: \'${emailId}\'`
            })
            return customer.data[0];
        } catch (err) {
            L.error(`error fetching customer for emailId ${emailId}`)
            throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }
    public async createCustomer(emailId: string): Promise<Stripe.Customer> {
        try {
            const customer: Stripe.Customer = await this.stripe.customers.create({
                email: emailId,
            });
            return customer;
        } catch (err) {
            L.error(`error creating customer for emailId ${emailId}`)
            throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }

    public async createSession(sessionPayload: StripeSessionPayload): Promise<Stripe.Checkout.Session> {
        try {
            const session: Stripe.Checkout.Session = await this.stripe.checkout.sessions.create(sessionPayload);
            return session;
        } catch (err) {
            L.error(`error creating stripe session ${JSON.stringify(sessionPayload)}`)
            throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }
}

export default StripeServiceImpl;
