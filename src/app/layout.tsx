// src/app/layout.tsx
import '@/styles/globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mahafuj Ahamed | Blockchain Developer',
  description: 'Portfolio of Mahafuj Ahamed – a blockchain and web3 developer creating secure, decentralized applications.',
  keywords: ['Mahafuj Ahamed', 'web3', 'portfolio', 'blockchain developer', 'Next.js portfolio', 'smart contracts', 'dapps'],
  authors: [{ name: 'Mahafuj Ahamed' }],
  robots: 'index, follow',
  metadataBase: new URL('https://mahafujahamed.me'), 
  openGraph: {
    title: 'Mahafuj Ahamed | Blockchain Developer',
    description: 'Explore my portfolio showcasing blockchain projects, blogs, and smart contract work.',
    url: 'https://mahafujahamed.me',
    siteName: 'Mahafuj Ahamed Portfolio',
    images: [
      {
        url: '/og-image.png', // add this image in /public folder
        width: 1200,
        height: 630,
        alt: 'Mahafuj Ahamed Portfolio',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahafuj Ahamed | Blockchain Developer',
    description: 'Explore projects and blogs built by Mahafuj using blockchain, Ethereum, and Next.js.',
    images: ['/og-image.png'],
    creator: '@yourTwitterHandle', // optional
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
