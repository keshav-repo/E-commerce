import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Success page',
    description: 'Success payment description',
};

export default async function Page() {
    return (
        <main className="pt-16">
            <h1>Payment Successful!</h1>;
        </main>
    );
}
