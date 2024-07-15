import React from 'react';
import Address from './Address';
import CartItem from './CartItem';

interface CartPageProps {
    address: {
        name: string;
        postalCode: string;
        address: string;
    };
    cartItems: {
        name: string;
        quantity: number;
        price: number;
        image: string;
        productId: number;
    }[];
}

const CartDetails: React.FC<CartPageProps> = ({ address, cartItems }) => {
    return (
        <div className="bg-gray-100 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
                <div className="w-full lg:w-[60%] p-4 sm:p-6">
                    <Address address={address.address} name={address.name} postalCode={address.postalCode} />
                    <div className="mt-4">
                        {cartItems.map(item => (
                            <CartItem key={item.productId} item={item} />
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
                            <span>₹{cartItems.reduce((total, item) => total + item.price, 0) + 20}</span>
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
