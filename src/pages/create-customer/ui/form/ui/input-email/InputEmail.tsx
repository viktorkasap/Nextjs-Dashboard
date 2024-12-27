import { EnvelopeIcon } from '@heroicons/react/24/outline';

import { InputErrorBlock } from '@/shared/ui';

interface InputEmailProps {
  errors?: string[];
  isPending?: boolean;
}

export const InputEmail = ({ isPending, errors }: InputEmailProps) => {
  return (
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
        {errors && <InputErrorBlock errors={errors} id="email-error" />}
      </div>
    </div>
  );
};
