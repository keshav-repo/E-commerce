'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { CartItem, OrderDetailsResponse } from '@/app/lib/definitions';
import OrderItemEle from './OrderItemEle';

const OrderDetails: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [message, setMessage] = useState<{ text: string, type: 'error' | 'info' }>({ text: '', type: 'info' });
    const [loading, setLoading] = useState(false);

    const [orders, setOrders] = useState<OrderDetailsResponse[]>([]);

    const fetchOrders = async () => {
        try {
            const response: Response = await fetch('/api/payment/order', {
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setOrders(data.data);
            }
            else {
                setMessage({ text: 'Some temporary issue, please report this to email: admin@ecommerce.com', type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'An error occurred while fetching cart items.', type: 'error' });
        }
    }

    useEffect(() => {
        const displayname: string | undefined = Cookies.get('displayname');
        if (!displayname) {
            setMessage({ text: 'Please log in to check your order', type: 'error' });
        } else {
            fetchOrders();
        }
    }, []);

    return (
        <div className="bg-gray-100 p-4 sm:p-6">
            {message.text && (
                <div className={`p-4 mb-4 text-sm rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
                <div className="w-full p-4">
                    <div className="border-b pb-3 mb-3">
                        <h3 className="text-2xl font-bold text-center text-gray-800">Orders</h3>
                    </div>
                    <div className="mt-4">
                        {orders.map(order => (
                            <OrderItemEle order={order} />
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default OrderDetails;
