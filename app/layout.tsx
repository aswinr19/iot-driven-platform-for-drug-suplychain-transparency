import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { MainchainProvider } from '../context/Mainchain'

const ibmPlex = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: '100',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'IoT Driven Platform For Drug Supplychain Trannsparency',
    description: 'IoT Driven Platform For Drug Supplychain Trannsparency',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <MainchainProvider>
                <body className={cn('antialiased', ibmPlex.className)}>
                    {children}
                </body>
            </MainchainProvider>
        </html>
    )
}
