'use client';

import { OrderDetailsResponseProps } from '@/app/lib/definitions';
import Link from 'next/link';
import React from 'react';

const OrderItemEle: React.FC<OrderDetailsResponseProps> = ({ order }) => {
    return (
        <Link href={`/product/${order.productid}`}>
            <div className="flex items-start border-b pb-4 last:border-b-0">
                <img src={order.image} alt="Product Image" className="w-20 h-20 rounded-md" />
                <div className="ml-4 flex-grow">
                    <p className="font-semibold text-lg">{order.name}</p>
                    <p className="text-gray-500 text-sm mb-2">{new Date(order.createdAt).toLocaleDateString()}</p>
                    <div className="flex items-center mt-2">
                        <div>
                            <label className="block text-gray-600">Qty: {order.quantity}</label>
                        </div>
                        <span className="text-black-800 font-semibold px-4">₹{order.price}</span>
                        <span className="text-black-800 font-semibold px-4">{order.status}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default OrderItemEle;
