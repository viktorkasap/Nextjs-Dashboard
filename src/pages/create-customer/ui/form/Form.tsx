'use client';

import { useActionState } from 'react';

import Link from 'next/link';

import { Button } from '@/shared/ui';

import { State, createCustomer } from './api';
import { InputName, InputEmail, InputAvatarUrl, InputAvatarUpload } from './ui';

export const Form = () => {
  const initialState: State = { message: '', errors: {} };
  const [state, formAction, isPending] = useActionState(createCustomer, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <InputName isPending={isPending} errors={state.errors?.name} />

        {/* Email */}
        <InputEmail isPending={isPending} errors={state.errors?.email} />

        {/* Url Avatar */}
        <InputAvatarUrl isPending={isPending} errors={state.errors?.avatarUrl} />

        {/* Upload Avatar */}
        <InputAvatarUpload isPending={isPending} errors={state.errors?.avatarUrl} />

        {/* Errors Description */}
        <div>{state.errors && <p className="mt-2 text-sm text-red-500">{state.message}</p>}</div>

        {/* Cancel & Submit */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/customers"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
            Cancel
          </Link>
          <Button disabled={isPending} type="submit">
            {isPending ? 'Creating...' : 'Create Customer'}
          </Button>
        </div>
      </div>
    </form>
  );
};
