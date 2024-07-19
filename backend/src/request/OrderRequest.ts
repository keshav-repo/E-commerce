export interface OrderItem {
    productid: number,
    quantity: number,
    unitPrice: number
}

export interface OrderRequest {
    items: OrderItem[],
    totalPrice: number
}

