'use client';

import { useActionState } from 'react';

import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { CustomerField } from '@/entites/customer';

import { Button, InputErrorBlock } from '@/shared/ui';

import { createInvoice, State } from './api';

export const Form = ({ customers }: { customers: CustomerField[] }) => {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer *
          </label>
          <div className="relative">
            <select
              // required
              id="customer"
              defaultValue=""
              name="customerId"
              disabled={isPending}
              aria-describedby="customer-error"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          {/* Errors */}
          {state.errors?.customerId && <InputErrorBlock errors={state.errors.customerId} id="customer-error" />}
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount *
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                // required
                step="0.01"
                id="amount"
                name="amount"
                type="number"
                disabled={isPending}
                placeholder="Enter USD amount"
                aria-describedby="amount-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>

            {/* Errors */}
            {state.errors?.amount && <InputErrorBlock errors={state.errors.amount} id="amount-error" />}
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">Set the invoice status *</legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  // required
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  disabled={isPending}
                  aria-describedby="status-error"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  // required
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  disabled={isPending}
                  aria-describedby="status-error"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>

          {/* Errors */}
          {state.errors?.status && <InputErrorBlock errors={state.errors.status} id="status-error" />}
        </fieldset>

        {/* Errors Description */}
        {state.errors && <p className="mt-2 text-sm text-red-500">{state.message}</p>}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button disabled={isPending} type="submit">
          {isPending ? 'Creating...' : 'Create Invoice'}
        </Button>
      </div>
    </form>
  );
};
