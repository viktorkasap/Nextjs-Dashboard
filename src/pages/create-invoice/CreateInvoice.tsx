import { getCustomers } from '@/entites/customer';
import { Breadcrumbs } from '@/widgets/breadcrumbs';

import { Form } from './ui';

const breadcrumbs = [
  { label: 'Invoices', href: '/dashboard/invoices' },
  { label: 'Create Invoice', href: '/dashboard/invoices/create', active: true },
];

export const CreateInvoice = async () => {
  const customers = await getCustomers();

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Form customers={customers} />
    </main>
  );
};
