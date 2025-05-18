import { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthInitializer from '@/components/providers/AuthInitializer';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white"> 
        <AuthInitializer />
        <Navbar />
        <main> 
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
