import type { Metadata } from 'next';
import "./globals.css";
import { MainchainProvider } from '../context/Mainchain';

export const metadata: Metadata = {
  title: "IoT Driven Platform For Drug Supplychain Trannsparency",
  description: "IoT Driven Platform For Drug Supplychain Trannsparency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MainchainProvider>
      <body>{children}</body>
      </MainchainProvider>
    </html>
  );
}
