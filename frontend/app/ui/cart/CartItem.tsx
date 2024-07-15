import { CartItemProps } from '@/app/lib/definitions';
import React from 'react';

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    return (
        <div className="flex items-start border-b pb-4">
            <img src={item.image} alt="Product Image" className="w-20 h-20 rounded-md" />
            <div className="ml-4 flex-grow">
                <p className="font-semibold">{item.name}</p>
                <div className="flex items-center mt-2">
                    <div>
                        <label className="block text-gray-600">Qty: {item.quantity}</label>
                    </div>
                    <span className="text-black-800 font-semibold px-4">₹{item.price}</span>
                </div>
            </div>
            <button className="text-gray-600 ml-auto">✖</button>
        </div>
    );
};

export default CartItem;
