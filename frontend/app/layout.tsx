import '@/app/ui/global.css';
import Header from './ui/header/header';
import { AuthProvider } from './lib/authContext';

const navItems = ['Men', 'Women', 'Kids', 'Home & Living', 'Beauty'];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header navItems={navItems} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
