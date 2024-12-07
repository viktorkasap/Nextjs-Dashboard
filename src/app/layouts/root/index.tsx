import { ReactNode } from 'react';

import { Metadata } from 'next';

import { inter } from './assets';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme',
    default: 'Acme Dashboard',
  },
  description: 'Test project dashboard',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
