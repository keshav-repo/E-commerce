export default interface CartItem {
    productId: number,
    quantity: number,
    price: number,
    createdAt: Date,
    updatedAt: Date
}

export default interface Cart {
    userId: number,
    createdAt: Date,
    updatedAt: Date,
    cartItems: CartItem[]
}
