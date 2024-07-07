import { Metadata } from 'next';
// import MyComponent from '../lib/MyComponent';
import CookirManager from '../ui/login/CookieManager';

// Ensure you have metadata for the page
export const metadata: Metadata = {
  title: 'Home page',
  description: 'Home page description',
};

export default function Page({
  token,
  username,
}: {
  token: string | null;
  username: string | null;
}) {
  return (
    <main className="pt-16">
      <CookirManager />
    </main>
  );
}
