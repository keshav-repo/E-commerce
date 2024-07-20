export default interface StripePaymentInfo {
    payment_intent_id: string,
    stripeCustomerId: string,
    payment_method: string,
    amount: number,
    currency: string,
    stripStatus: string,
    createdTime: number,
    completedTime?: number,
    orderId: number
}
