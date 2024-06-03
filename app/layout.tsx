import React from 'react';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-context';
import { StoreProvider } from '@/store/provider';

import '@/styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Kdal.',
  description:
    'Émerveiller vos proches grâce à notre sélection raffinée de cadeaux.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicon-black.svg',
        href: '/favicon-black.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon-white.svg',
        href: '/favicon-white.svg',
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const className = cn(
    'bg-background text-foreground font-sans antialiased',
    fontSans.variable
  );

  return (
    <html lang="en">
      <body className={className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <Header />
            {children}
            <Footer />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
