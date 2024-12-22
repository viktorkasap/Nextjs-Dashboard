'use client';

import { Fragment, ReactNode, useState } from 'react';

import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { TrashIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { toast } from 'react-toastify';

import { useDeleteInvoiceContext } from '../../context';
import { DeleteInvoiceProps } from '../../types';

import { deleteInvoiceById } from './api';

/**
 * Handles the functionality for deleting an invoice.
 * Opens a confirmation dialog, and upon confirmation, attempts to delete the specified invoice.
 * Provides visual feedback through pending states and toast notification indicating failure.
 */
export const DeleteInvoice = ({ invoiceId }: DeleteInvoiceProps): ReactNode => {
  // For dialog state
  const [isOpen, setIsOpen] = useState(false);

  const { setIsDeleting } = useDeleteInvoiceContext();
  const { isPending, handleDelete } = useDeleteInvoice({
    invoiceId,
    callbackStart: () => {
      setIsDeleting(true);
      setIsOpen(false);
    },
    callbackEnd: () => {
      setIsDeleting(false);
    },
  });

  return (
    <>
      {/* Trigger */}
      <button
        disabled={isPending}
        onClick={() => setIsOpen(true)}
        className={clsx('rounded-md border p-2 hover:bg-gray-100', { 'opacity-50 cursor-not-allowed bg-gray-100': isPending })}>
        {isPending ? <ClockIcon className="w-5" /> : <TrashIcon className="w-5" />}
      </button>

      {/* Dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" open={isOpen} onClose={() => setIsOpen(false)}>
          <TransitionChild
            as={Fragment}
            leaveTo="opacity-0"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leave="ease-in duration-200"
            enter="ease-out duration-300">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                leaveTo="opacity-0 scale-95"
                leave="ease-in duration-200"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leaveFrom="opacity-100 scale-100">
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* Title */}
                  <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Are you sure you wish to delete this invoice?
                  </DialogTitle>

                  {/* Description */}
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">
                      <Description>This will permanently delete the invoice.</Description>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
                      onClick={() => setIsOpen(false)}>
                      Cancel
                    </button>
                    {/* Delete Form */}
                    <button
                      onClick={handleDelete}
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none">
                      Delete
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

interface UseDeleteInvoiceProps {
  invoiceId: string;
  callbackStart?: () => void;
  callbackEnd?: () => void;
}

const useDeleteInvoice = ({ invoiceId, callbackStart, callbackEnd }: UseDeleteInvoiceProps) => {
  // For UI pending status
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    callbackStart?.();
    setIsPending(true);

    try {
      await toast.promise(deleteInvoiceById(invoiceId), {
        pending: 'Deleting invoice...',
        success: {
          render: ({ data }) => {
            return data?.message || 'Invoice deleted successfully!';
          },
        },
        error: {
          render({ data }) {
            return (data as Error)?.message || 'Failed to delete invoice2.';
          },
        },
      });
    } finally {
      setIsPending(false);
      callbackEnd?.();
    }
  };

  return { isPending, handleDelete };
};
