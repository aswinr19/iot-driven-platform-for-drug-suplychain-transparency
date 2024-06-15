import type { Metadata } from 'next';
import "./globals.css";
import Nav from '../components/nav';
import { MainChainProvider } from '../context/MainChain';

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
      <MainChainProvider>
      <Nav />
      <body>{children}</body>
      </MainChainProvider>
    </html>
  );
}
