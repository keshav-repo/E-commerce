import { Metadata } from 'next';
import SignupModule from '../ui/signup';

export const metadata: Metadata = {
  title: 'signup page title',
  description: 'signup description',
};

export default async function Page() {
  return (
    <main className="pt-16">
      <SignupModule />
    </main>
  );
}
