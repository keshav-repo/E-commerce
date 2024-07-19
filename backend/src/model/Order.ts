interface OrderItem {
    price: number,
    quantity: number,
    productid: number,
    orderid: number,
}
interface Order {
    userid: number,
    totalamount: number,
    status: string
}
export {
    Order, OrderItem
}

