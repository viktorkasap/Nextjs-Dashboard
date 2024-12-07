import { ReactNode } from 'react';

import { Metadata } from 'next';

import { SidebarNav } from '@/widgets/sidebar-nav';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Dashboard',
  },
  description: 'Dashboard',
};

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SidebarNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
