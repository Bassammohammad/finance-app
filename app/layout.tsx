import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { QueryProvider } from '@/ providers/quary-provider';
import { SheetProvider } from '@/ providers/sheet-provider';
import { Loader2 } from 'lucide-react';
import { SuspenseWrapper } from '@/components/suspense-wrapper';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Finance App',
  description: 'Gérez votre finance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} `}>
          <SuspenseWrapper
            fallback={<Loader2 className="text-neutral-400 animate-spin" />}
          >
            <QueryProvider>
              <SheetProvider />
              <Toaster />
              {children}
            </QueryProvider>
          </SuspenseWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
