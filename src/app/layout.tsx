// src/app/layout.tsx
import '@/styles/globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

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
        url: '/my-profile.png',
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
    images: ['/my-profile.png'],
    creator: '@devmahafuj',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* ✅ Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SHB7C800YK"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SHB7C800YK');
            `,
          }}
        />

        {/* ✅ JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mahafuj Ahamed",
              url: "https://mahafujahamed.me",
              image: "https://mahafujahamed.me/my-profile.png",
              jobTitle: "Blockchain Developer",
              sameAs: [
                "https://github.com/mahafujahamed",
                "https://www.linkedin.com/in/mahafuj-python",
                "https://twitter.com/devmahafuj",
                "https://www.facebook.com/share/14Eoi8pV6eN/"
              ]
            }),
          }}
        />

        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
