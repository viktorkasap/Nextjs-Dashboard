# Delete with APP router

> 1) Add API route: `app/api/invoices/route.ts`
```ts
import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

/*
    # DELETE
    curl -X DELETE http://localhost:3000/api/invoices \
         -H "Content-Type: application/json" \
         -d '{"id": "123"}'
 */
export async function DELETE(request: NextRequest): Promise<Response> {
    try {
        const body = (await request.json()) as { id: string };
        const { id: invoiceId } = body;

        // eslint-disable-next-line no-console
        console.log('Invoices DELETE Request Body: \n', invoiceId);

        if (!invoiceId) {
            return NextResponse.json({ error: 'Invoice ID is required.' }, { status: 400 });
        }

        // Delete Action
        await sql`DELETE FROM invoices WHERE id = ${invoiceId}`;

        return NextResponse.json({ message: 'Invoice was deleted successfully.' }, { status: 200 });
    } catch (error) {
        const errorMessage = (error as Error).message;
        // eslint-disable-next-line no-console
        console.log('Invoices DELETE ERROR: \n', errorMessage);

        return NextResponse.json({ error: `Database Error: ${errorMessage}` }, { status: 500 });
    }
}

```

> 2) Update component: `src/pages/invoices/ui/delete-invoice/DeleteInvoice.tsx`
```ts
'use client';

import { Fragment, ReactNode, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { TrashIcon, ClockIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';

import { DeleteInvoiceProps } from '../../types';

/**
 * Handles the functionality for deleting an invoice.
 * Opens a confirmation dialog, and upon confirmation, attempts to delete the specified invoice.
 * Provides visual feedback through pending states and toast notifications indicating success or failure.
 *
 * @param {Object} DeleteInvoiceProps - The properties used to configure the invoice deletion.
 * @param {string} DeleteInvoiceProps.id - The identifier of the invoice to be deleted.
 *
 * @return {JSX.Element} A React component that includes a delete button and a confirmation dialog.
 */
export const DeleteInvoice = ({ id }: DeleteInvoiceProps): ReactNode => {
// Dialogue state
  const [isOpen, setIsOpen] = useState(false);

    // Loading status and messages
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  /**
   * Function for deleting an account via the API route.
   */
  const handleDelete = async () => {
    setIsPending(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('/api/deleteInvoice', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (response.ok && result.message) {
        setMessage(result.message);
        toast.success(result.message, { autoClose: 3000 });
        // Update data if you use SWR or another fetching library
        mutate('/dashboard/invoices');
      } else if (result.error) {
        setError(result.error);
        toast.error(result.error, { autoClose: false });
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      toast.error('An unexpected error occurred.', { autoClose: false });
    } finally {
      setIsPending(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <button
        disabled={isPending}
        onClick={() => setIsOpen(true)}
        className={`rounded-md border p-2 hover:bg-gray-100 transition-opacity duration-200 ${
          isPending ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <span className="sr-only">Delete</span>
        {isPending ? <ClockIcon className="w-5" /> : <TrashIcon className="w-5" />}
      </button>

      {/* Dialog Confirm */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* Title */}
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Are you sure you wish to delete this invoice?
                  </Dialog.Title>

                  {/* Description */}
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">This will permanently delete the invoice.</p>
                  </div>

                  {/* Actions Buttons */}
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={isPending}
                      className={`inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none transition-opacity duration-200 ${
                        isPending ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isPending ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
```
