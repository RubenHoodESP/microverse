import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/shared/store/providers';
import { ClientLayout } from './clientLayout';
import { ThemeProvider } from '@/shared/theme/ThemeProvider';
import { MSWProvider } from './msw';

const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Microverse',
  description: 'Una red social para desarrolladores',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased transition-colors duration-300">
        <Providers>
          <ThemeProvider>
            <MSWProvider>
              <ClientLayout>{children}</ClientLayout>
            </MSWProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
