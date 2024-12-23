import { Suspense } from 'react';

import { queryLatestInvoices } from '@/entites/invoice';

import { LatestInvoices } from '@/widgets/latest-invoices';

import { InvoiceSkeleton } from '@/shared/ui';

export const Invoices = () => {
  return (
    <Suspense fallback={<InvoiceSkeleton />}>
      <InvoicesView />
    </Suspense>
  );
};

const InvoicesView = async () => {
  const latestInvoices = await queryLatestInvoices();

  return <LatestInvoices latestInvoices={latestInvoices} />;
};
