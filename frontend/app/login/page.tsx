import { Metadata } from 'next';
import LoginModule from '../ui/login/login';

export const metadata: Metadata = {
  title: 'Login page title',
  description: 'login description',
};

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <main className="pt-16">
      <LoginModule />
    </main>
  );
}
