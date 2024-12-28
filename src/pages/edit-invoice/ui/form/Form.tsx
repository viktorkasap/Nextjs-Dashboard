'use client';

import { useActionState } from 'react';

import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { InvoiceStatus } from '@prisma/client';
import Link from 'next/link';

import { CustomerField } from '@/entites/customer';
import { Invoice } from '@/entites/invoice';

import { Button, InputErrorBlock } from '@/shared/ui';

import { updateInvoice, State } from './api';

interface FormProps {
  invoice: Invoice;
  customers: CustomerField[];
}

export const Form = ({ invoice, customers }: FormProps) => {
  const currentCustomer = customers.find((customer) => customer.id === invoice.customerId);

  // * Or <input type="hidden" name="invoiceId" value={invoice.id}/>
  // const foo = func.bind() - Function Partial https://javascript.info/bind#partial-functions
  const updateInvoiceById = updateInvoice.bind(null, invoice.id);

  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(updateInvoiceById, initialState);

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
              id="customer"
              name="customerId"
              disabled={isPending}
              defaultValue={currentCustomer?.id}
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
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                disabled={isPending}
                defaultValue={invoice.amount}
                placeholder="Enter USD amount"
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
                  type="radio"
                  name="status"
                  disabled={isPending}
                  id={InvoiceStatus.Pending}
                  value={InvoiceStatus.Pending}
                  defaultChecked={invoice.status === InvoiceStatus.Pending}
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
                  type="radio"
                  name="status"
                  disabled={isPending}
                  id={InvoiceStatus.Paid}
                  value={InvoiceStatus.Paid}
                  defaultChecked={invoice.status === InvoiceStatus.Paid}
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

          {/* Errors Description */}
          {state.errors && <p className="mt-2 text-sm text-red-500">{state.message}</p>}
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>

        {/* As a second option for passing the invoice ID */}
        <input type="hidden" name="invoiceId" value={invoice.id} />
        <Button disabled={isPending} type="submit">
          {isPending ? 'Updating...' : 'Update Invoice'}
        </Button>
      </div>
    </form>
  );
};
