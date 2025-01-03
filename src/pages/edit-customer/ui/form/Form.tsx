'use client';

import { useActionState } from 'react';

import Link from 'next/link';

import { Customer } from '@/entites/customer';

import { Button, InputErrorBlock } from '@/shared/ui';

import { State, updateCustomer } from './api';
import { InputAvatarUpload, InputAvatarUrl, InputEmail, InputName } from './ui';

export const Form = ({ customer }: { customer: Customer }) => {
  const initialState: State = { message: '', errors: {} };
  const [state, formAction, isPending] = useActionState(updateCustomer, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <input type="hidden" name="customer-id" value={customer.id} aria-describedby="customer-id-error" />

        {/* Name */}
        <InputName value={customer.name} isPending={isPending} errors={state.errors?.name} />

        {/* Email */}
        <InputEmail value={customer.email} isPending={isPending} errors={state.errors?.email} />

        {/* Url Avatar */}
        <InputAvatarUrl value={customer.avatarUrl || ''} isPending={isPending} errors={state.errors?.avatarUrl} />

        {/* Upload Avatar */}
        <InputAvatarUpload value={customer.avatarFile} isPending={isPending} errors={state.errors?.avatarUrl} />

        {/* Errors Description */}
        <div>{state.errors && <p className="mt-2 text-sm text-red-500">{state.message}</p>}</div>
        <div>{state.errors?.id && <InputErrorBlock label="Customer ID" errors={state.errors.id} id="customer-id-error" />}</div>

        {/* Cancel & Submit */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/customers"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
            Cancel
          </Link>
          <Button disabled={isPending} type="submit">
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </form>
  );
};
