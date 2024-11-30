import { TrashIcon } from '@heroicons/react/24/outline';

import { DeleteInvoiceProps } from '../../types';

import { deleteInvoiceById } from './api';

export const DeleteInvoice = ({ id }: DeleteInvoiceProps) => {
  const deleteAction = deleteInvoiceById.bind(null, id);

  return (
    <form action={deleteAction}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
};
