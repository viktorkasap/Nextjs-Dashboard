import { TrashIcon } from '@heroicons/react/24/outline';

import { DeleteInvoiceProps } from '../../types';

export const DeleteInvoice = ({ id }: DeleteInvoiceProps) => {
  // eslint-disable-next-line no-console
  console.log('Deleting invoice ID:', id);

  return (
    <>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
};
