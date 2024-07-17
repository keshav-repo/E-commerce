import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Payment cancel page',
    description: 'Payment Cancel description',
};

export default async function Page() {
    return (
        <main className="pt-16">
            <h1>Payment Canceled!</h1>;
        </main>
    );
}
