'use client';

import { useActionState } from 'react';

import { AtSymbolIcon, ExclamationCircleIcon, UserIcon } from '@heroicons/react/20/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { KeyIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { lusitana } from '@/shared/assets';
import { Button, InputErrorBlock } from '@/shared/ui';

import { createUser, State } from './api';

export const Form = () => {
  const initialState: State = { message: '', errors: {} };
  const [state, formAction, isPending] = useActionState(createUser, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>Please log in to continue.</h1>
        <div className="w-full">
          {/* Email */}
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="name"
                name="name"
                placeholder="Enter your name"
                aria-describedby="name-error"
                disabled={isPending}
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>

            {/* Errors */}
            {state.errors?.name && <InputErrorBlock errors={state.errors?.name} id="name-error" />}
          </div>

          {/* Email */}
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                aria-describedby="email-error"
                disabled={isPending}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>

            {/* Errors */}
            {state.errors?.email && <InputErrorBlock errors={state.errors?.email} id="email-error" />}
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                disabled={isPending}
                aria-describedby="password-error"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>

            {/* Errors */}
            {state.errors?.password && <InputErrorBlock errors={state.errors?.password} id="password-error" />}
          </div>

          {/* Password Confirm */}
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password-confirm"
                type="password"
                name="password-confirm"
                placeholder="Confirm password"
                required
                disabled={isPending}
                minLength={6}
                aria-describedby="confirm-password-error"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          {/* Errors */}
          {state.errors?.confirmPassword && <InputErrorBlock errors={state.errors?.confirmPassword} id="confirm-password-error" />}
        </div>

        {/* Submit */}
        <Button className="mt-4 mb-4 w-full" aria-disabled={isPending} type="submit">
          Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        <Link href="/sign-in" className="block text-right text-sm text-blue-500 hover:underline">
          Sign in page
        </Link>

        {/* Errors */}
        <div className="flex h-8 items-end space-x-1">{state.errors && <InputErrorBlock errors={[state.message]} id="errors" />}</div>
      </div>
    </form>
  );
};
