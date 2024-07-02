import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E commerce app",
  description: "One solution for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
