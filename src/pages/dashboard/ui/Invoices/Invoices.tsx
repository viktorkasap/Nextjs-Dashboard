import { Suspense } from 'react';

import { getLatestInvoices } from '@/entites/invoice';
import { InvoiceSkeleton } from '@/shared/ui';
import { LatestInvoices } from '@/widgets/latest-invoices';

export const Invoices = () => {
  return (
    <Suspense fallback={<InvoiceSkeleton />}>
      <InvoicesView />
    </Suspense>
  );
};

const InvoicesView = async () => {
  const latestInvoices = await getLatestInvoices();

  return <LatestInvoices latestInvoices={latestInvoices} />;
};
