import { Metadata } from 'next';
import CartDetails from '../ui/cart/CartDetails';

export const metadata: Metadata = {
    title: 'Cart page',
    description: 'cart description',
};

const address = {
    name: 'John Doe',
    postalCode: '56010',
    address: '121,50, Bangalore, Bengaluru'
};

const cartItems = [
    {
        "name": "Women Striped Kurta",
        "image": "https://ecomstore-dev-data.s3.us-east-2.amazonaws.com/product/women_striped_kurta_1.jpg",
        "quantity": 10,
        "price": 701,
        "productId": 13
    },
    {
        "name": "Boys Yellow Geometric Printed Kurta",
        "image": "https://ecomstore-dev-data.s3.us-east-2.amazonaws.com/product/boys_yellow_geometric_printed_kurta_1.jpg",
        "quantity": 5,
        "price": 769,
        "productId": 15
    }
];

export default async function Page() {
    return (
        <main className="pt-16">
            <CartDetails address={address} cartItems={cartItems} />
        </main>
    );
}
