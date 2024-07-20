import { PrismaClient, orderitems, orders, stripepaymentinfo } from "@prisma/client";
import L from "../../helper/logger";
import StripePaymentInfo from "../../model/stripePaymentInfo";
import StripepaymentRepo from "../Stripepaymentinfo";

class StripepaymentRepoImpl implements StripepaymentRepo {
    private prisma: PrismaClient;
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }
    public create = async (stripePaymentInfo: StripePaymentInfo): Promise<stripepaymentinfo> => {
        try {
            const info: stripepaymentinfo = await this.prisma.stripepaymentinfo.create({
                data: {
                    payment_intent_id: stripePaymentInfo.payment_intent_id,
                    stripecustomerid: stripePaymentInfo.stripeCustomerId,
                    payment_method: stripePaymentInfo.payment_method,
                    amount: stripePaymentInfo.amount,
                    currency: stripePaymentInfo.currency,
                    stripestatus: stripePaymentInfo.stripStatus,
                    createdtime: new Date(stripePaymentInfo.createdTime),
                    completedtime: new Date(stripePaymentInfo.completedTime!),
                    orderid: stripePaymentInfo.orderId
                }
            });
            return info;
        } catch (err) {
            L.error(`error creating stripepaymentinfo ${err}`)
            throw new Error("Error creating stripepaymentinfo");
        }
    }
}

export default StripepaymentRepoImpl;
