export default interface OrderDetailsResponse {
    name: string,
    image: string,
    quantity: number,
    price: number,
    createdAt: Date,
    productid: number,
    status: string
}