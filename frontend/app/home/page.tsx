import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home page',
  description: 'Home page description',
};

export default async function Page() {
  return <main className="pt-16"></main>;
}
