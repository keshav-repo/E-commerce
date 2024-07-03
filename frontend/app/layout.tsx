import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Header from './ui/header/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
