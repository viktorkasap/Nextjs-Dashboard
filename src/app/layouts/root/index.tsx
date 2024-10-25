import { ReactNode } from 'react';

import { Metadata } from 'next';

import { inter } from './assets';

export const metadata: Metadata = {
  title: 'Test Dashboard',
  description: 'Test project dashboard',
};

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
