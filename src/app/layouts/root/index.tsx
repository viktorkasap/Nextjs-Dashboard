import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Dashboard',
  description: 'Test project dashboard',
};

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
