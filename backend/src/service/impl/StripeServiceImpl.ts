import Stripe from "stripe";
import { StripeService } from "../StripeService";
import { ResponseTypes } from "../../config/ResponseTypes";
import { StripeError } from "../../error/StripeError";
import { InternalServerError } from "../../error/InternalServerError";
import L from "../../helper/logger";

class StripeServiceImpl implements StripeService {
    private stripe: Stripe;
    constructor(stripe: Stripe) {
        this.stripe = stripe;
    }
    public async getPricing(productid: string): Promise<Stripe.Price> {
        try {
            const prices: Stripe.ApiList<Stripe.Price> = await this.stripe.prices.list({
                product: productid,
                active: true
            });
            if (prices.data.length > 0) {
                const price: Stripe.Price = prices.data[0];
                return price;
            } else {
                throw new StripeError(ResponseTypes.STRIPE_PRICE_NOT_FOUND.message, ResponseTypes.STRIPE_PRICE_NOT_FOUND.code);
            }
        } catch (err) {
            L.error(`error fetching stripe price for productid ${productid}`)
            if (err instanceof StripeError)
                throw err;
            else
                throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }
}

export default StripeServiceImpl;
