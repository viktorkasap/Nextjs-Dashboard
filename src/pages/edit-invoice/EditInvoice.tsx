import { notFound } from 'next/navigation';

import { queryCustomers } from '@/entites/customer';
import { queryInvoiceById } from '@/entites/invoice';

import { Breadcrumbs } from '@/widgets/breadcrumbs';

import { Form } from './ui';

const breadcrumbs = (id: string) => [
  { label: 'Invoices', href: '/dashboard/invoices' },
  { label: 'Edit Invoice', href: `/dashboard/invoices/${id}/edit`, active: true },
];

interface EditInvoiceProps {
  params: Promise<{ id: string }>;
}

export const EditInvoice = async ({ ...props }: EditInvoiceProps) => {
  const { id } = await props.params;
  const [invoice, customers] = await Promise.all([queryInvoiceById(id), queryCustomers()]);

  // eslint-disable-next-line no-console
  console.log({ invoice, customers });

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs(id)} />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
};
