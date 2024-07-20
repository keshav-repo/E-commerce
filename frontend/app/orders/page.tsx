import { Metadata } from 'next';
import OrderDetails from '../ui/order/OrderDetails';

export const metadata: Metadata = {
    title: 'Success page',
    description: 'Success payment description',
};

export default async function Page() {
    return (
        <main className="pt-16">
            <OrderDetails />
        </main>
    );
}
