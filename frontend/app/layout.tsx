import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Header from './ui/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Header />
      {/* <body className={`${inter.className} antialiased`}>{children}</body> */}
      <body>{children}</body>
    </html>
  );
}
