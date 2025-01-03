import { notFound } from 'next/navigation';

import { getCustomerById } from '@/entites/customer';

import { Breadcrumbs } from '@/widgets/breadcrumbs';

import { Form } from './ui';

const breadcrumbs = (id: string) => [
  { label: 'Customers', href: '/dashboard/customers' },
  { label: 'Edit Customer', href: `/dashboard/customer/${id}/edit`, active: true },
];

interface EditInvoiceProps {
  params: Promise<{ id: string }>;
}

export const EditCustomer = async ({ ...props }: EditInvoiceProps) => {
  const { id } = await props.params;
  const customer = await getCustomerById(id);

  if (!customer) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs(id)} />
      <Form customer={customer} />
    </main>
  );
};
