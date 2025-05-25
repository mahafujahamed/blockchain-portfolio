import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Providers from '@/providers/ThemeProvider';

export const metadata = {
  title: 'Mahafuj – Blockchain Developer',
  description: 'Personal portfolio website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers> 
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}




