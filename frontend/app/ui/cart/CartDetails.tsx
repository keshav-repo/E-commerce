'use client';

import React, { useEffect, useState } from 'react';
import Address from './Address';
import CartItemEle from './CartItem';
import { CartItem } from '@/app/lib/definitions';
import Cookies from 'js-cookie';

const address = {
    name: 'John Doe',
    postalCode: '56010',
    address: '121,50, Bangalore, Bengaluru'
};

const CartDetails: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [message, setMessage] = useState<{ text: string, type: 'error' | 'info' }>({ text: '', type: 'info' });

    const fetchCartItems = async () => {
        try {
            const response: Response = await fetch('/api/cart', {
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setCartItems(data.data);
            }
            else {
                setMessage({ text: 'Some temporary issue, please report this to email: admin@ecommerce.com', type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'An error occurred while fetching cart items.', type: 'error' });
        }
    }

    const deleteCartItem = async (productId: number) => {
        try {
            const response = await fetch(`/api/cart?productId=${productId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await response.json();
            if (data.successCode == 'SUC10') {
                setCartItems(prevItems => prevItems.filter(item => item.productId != productId));
            } else {
                setMessage({ text: 'Failed to delete item.', type: 'error' });
            }
        } catch (err) {
            console.log(`error in deleting cart item`);
            setMessage({ text: 'An error occurred while deleting cart item.', type: 'error' });
        }
    }

    useEffect(() => {
        const displayname: string | undefined = Cookies.get('displayname');
        if (!displayname) {
            setMessage({ text: 'Please log in to check your cart', type: 'error' });
        } else {
            fetchCartItems();
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
                <div className="w-full lg:w-[60%] p-4 sm:p-6">
                    <Address address={address.address} name={address.name} postalCode={address.postalCode} />
                    <div className="mt-4">
                        {cartItems.map(item => (
                            <CartItemEle key={item.productId} item={item} onDelete={deleteCartItem} />
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-[40%] p-4 sm:p-6">
                    <div className="bg-white shadow-md rounded p-4">
                        <p className="font-semibold">PRICE DETAILS ({cartItems.length} Items)</p>
                        <div className="flex justify-between mt-2">
                            <span>Total MRP</span>
                            <span>₹{cartItems.reduce((total, item) => total + item.price, 0)}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Discount on MRP</span>
                            <span className="text-green-600">0</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Coupon Discount</span>
                            <span className="text-blue-400">Apply Coupon</span>
                        </div>
                        <div className="flex justify-between mt-2 font-bold">
                            <span>Total Amount</span>
                            <span>₹{cartItems.reduce((total, item) => total + item.price, 0)}</span>
                        </div>
                        <button className="mt-4 bg-blue-400 text-white w-full py-2 rounded">PLACE ORDER</button>
                    </div>
                    <div className="bg-white shadow-md rounded px-4 pb-4 mb-4">
                        <p className="font-semibold">COUPONS</p>
                        <div className="flex mt-2">
                            <input type="text" className="border p-2 flex-grow" placeholder="Apply Coupons" />
                            <button className="ml-2 bg-blue-400 text-white px-4 py-2 rounded">APPLY</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetails;
