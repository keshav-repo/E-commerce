import { Metadata } from 'next';
import CartDetails from '../ui/cart/CartDetails';

export const metadata: Metadata = {
    title: 'Cart page',
    description: 'cart description',
};

export default async function Page() {
    return (
        <main className="pt-16">
            <CartDetails />
        </main>
    );
}
