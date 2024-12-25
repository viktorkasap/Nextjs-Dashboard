import { ChangeEvent, useState } from 'react';

import { CloudArrowDownIcon } from '@heroicons/react/24/outline';

import { InputErrorBlock } from '@/shared/ui';

const MAX_UPLOAD_SIZE = 64 * 1024; // 64Kb
const ACCEPTED_FILE_TYPES = new Set(['jpg', 'jpeg', 'png', 'webp']);

export const InputAvatarUpload = ({ errors }: { errors?: string[] }) => {
  const [sizeError, setSizeError] = useState<string | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // reset errors
    setSizeError(null);
    setTypeError(null);

    // File
    const file = e.target.files?.[0];

    // Check size
    if (file && file?.size > MAX_UPLOAD_SIZE) {
      setSizeError(`File size is too big. Max size is ${MAX_UPLOAD_SIZE / 1024}Kb. Current size is ${(file.size / 1024).toFixed(2)}Kb.`);
    }

    // Check type - image/png -> [image, png]
    if (file && !ACCEPTED_FILE_TYPES.has(file.type.split('/')[1])) {
      setTypeError(`File type is not supported. Accepted types: ${[...ACCEPTED_FILE_TYPES].join(', ')}`);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="customer" className="mb-2 block text-sm font-medium">
        Upload Avatar
        <span className="text-gray-500 text-xs">
          (Max size: {MAX_UPLOAD_SIZE / 1024}Kb. Types: {[...ACCEPTED_FILE_TYPES].join(', ')})
        </span>
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            type="file"
            id="avatar-file"
            name="avatar-file"
            // disabled={isPending}
            onChange={handleChange}
            accept=".jpg, .jpeg, .png, .webp"
            max-size="65536" // 64Kb = 64 * 1024
            placeholder="select your avatar"
            aria-describedby="avatar-file-error"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <CloudArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        {/* Server Errors */}
        {errors && <InputErrorBlock errors={errors} id="avatar-file-error" />}

        {/* Client Errors */}
        {(typeError || sizeError) && (
          <InputErrorBlock errors={[sizeError, typeError].filter((error) => error) as string[]} id="avatar-upload-error" />
        )}
      </div>

      {/* TODO: Add preview block */}
    </div>
  );
};
