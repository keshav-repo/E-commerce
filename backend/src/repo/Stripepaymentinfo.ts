import { stripepaymentinfo } from "@prisma/client";
import StripePaymentInfo from "../model/stripePaymentInfo";

export default interface StripepaymentRepo {
    create(stripePaymentInfo: StripePaymentInfo): Promise<stripepaymentinfo>;
}