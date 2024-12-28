import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { UpdateInvoiceProps } from '../../types';

export const EditInvoice = ({ invoiceId }: UpdateInvoiceProps) => {
  // eslint-disable-next-line no-console
  console.log('Update invoice ID:', invoiceId);

  return (
    <Link href={`/dashboard/invoices/${invoiceId}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
      <PencilIcon className="w-5" />
    </Link>
  );
};
