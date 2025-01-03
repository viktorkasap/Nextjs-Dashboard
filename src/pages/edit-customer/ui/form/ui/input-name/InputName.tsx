import { UserIcon } from '@heroicons/react/24/outline';

import { InputErrorBlock } from '@/shared/ui';

interface InputNameProps {
  errors?: string[];
  isPending?: boolean;
  value: string;
}

export const InputName = ({ isPending, errors, value }: InputNameProps) => {
  return (
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
            defaultValue={value}
            disabled={isPending}
            placeholder="John Doe"
            aria-describedby="name-error"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {/* Errors */}
        {errors && <InputErrorBlock errors={errors} id="name-error" />}
      </div>
    </div>
  );
};
