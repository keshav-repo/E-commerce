import Link from 'next/link';

export default function Page() {
  return (
    <p>
      Customers Page
      <Link href="http://localhost:3000/dashboard/invoices">Invoices</Link>
    </p>
  );
}
