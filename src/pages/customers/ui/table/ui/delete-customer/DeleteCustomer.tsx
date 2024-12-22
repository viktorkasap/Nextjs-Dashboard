'use client';

import { useActionState, useEffect } from 'react';

import { ClockIcon, TrashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { toast } from 'react-toastify';

import { State, deleteCustomerById } from './api';

interface DeleteCustomerProps {
  customerId: string;
}

export const DeleteCustomer = ({ customerId }: DeleteCustomerProps) => {
  const initialState: State = { success: false, message: null, error: null };
  const [state, deleteCustomer, isPending] = useActionState((prevState: State) => deleteCustomerById(prevState, customerId), initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error, { autoClose: false });
    }
  }, [state]);

  return (
    <form action={deleteCustomer}>
      <button
        disabled={isPending}
        className={clsx('rounded-md border p-2 hover:bg-gray-100', { 'opacity-50 cursor-not-allowed bg-gray-100': isPending })}>
        {isPending ? <ClockIcon className="w-5" /> : <TrashIcon className="w-5" />}
      </button>
    </form>
  );
};
