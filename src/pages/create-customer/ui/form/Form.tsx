'use client';

import { useActionState } from 'react';

import { UserIcon, EnvelopeIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { Button, InputErrorBlock } from '@/shared/ui';

import { State, createCustomer } from './api';
import { InputAvatarUpload } from './ui';

export const Form = () => {
  const initialState: State = { message: '', errors: {} };
  const [state, formAction, isPending] = useActionState(createCustomer, initialState);

  return (
    <form action={formAction} encType="multipart/form-data">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Customer Name *
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                // required
                id="name"
                name="name"
                type="text"
                disabled={isPending}
                placeholder="John Doe"
                aria-describedby="name-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {/* Errors */}
            {state.errors?.name && <InputErrorBlock errors={state.errors.name} id="name-error" />}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Customer Email *
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                // required
                id="email"
                name="email"
                type="text"
                disabled={isPending}
                placeholder="john@doe.com"
                aria-describedby="email-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {/* Errors */}
            {state.errors?.email && <InputErrorBlock errors={state.errors.email} id="email-error" />}
          </div>
        </div>

        {/* Url Avatar */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Customer Avatar
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                // required
                id="avatar-url"
                name="avatar-url"
                type="text"
                disabled={isPending}
                placeholder="path to avatar"
                aria-describedby="avatar-url-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {/* Errors */}
            {/* {state.errors?.avatarUrl && <InputErrorBlock errors={state.errors.avatarUrl} id="avatar-url-error" />} */}
          </div>
        </div>

        {/* Upload Avatar */}
        <InputAvatarUpload isPending={isPending} errors={state.errors?.avatarUrl} />

        {/* Errors Description */}
        <div>{state.errors && <p className="mt-2 text-sm text-red-500">{state.message}</p>}</div>

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
