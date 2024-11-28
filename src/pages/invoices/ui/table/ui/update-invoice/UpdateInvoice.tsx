import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const UpdateInvoice = ({ id }: { id: string }) => {
  // eslint-disable-next-line no-console
  console.log('Update invoice ID:', id);

  return (
    <Link href="/dashboard/invoices" className="rounded-md border p-2 hover:bg-gray-100">
      <PencilIcon className="w-5" />
    </Link>
  );
};
