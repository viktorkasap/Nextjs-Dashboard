import { Breadcrumbs } from '@/widgets/breadcrumbs';

import { Form } from './ui';

const breadcrumbs = [
  { label: 'Customers', href: '/dashboard/customers' },
  { label: 'Create Customer', href: '/dashboard/customers/create', active: true },
];

export const CreateCustomer = () => {
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Form />
    </main>
  );
};
