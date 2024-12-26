import { ChangeEvent, useRef, useState } from 'react';

import { Button, InputErrorBlock } from '@/shared/ui';

const MAX_UPLOAD_SIZE = 64 * 1024; // 64Kb
const ACCEPTED_FILE_TYPES = new Set(['jpg', 'jpeg', 'png', 'webp']);

export const InputAvatarUpload = ({ isPending, errors }: { isPending: boolean; errors?: string[] }) => {
  const [sizeError, setSizeError] = useState<string | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [imageSrcPreview, setImageSrcPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // On change handler input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Reset states
    setSizeError(null);
    setTypeError(null);
    setImageSrcPreview(null);

    // File
    const file = e.target.files?.[0];

    // Check size
    if (file && file?.size > MAX_UPLOAD_SIZE) {
      setSizeError(`File size is too big. Max size is ${MAX_UPLOAD_SIZE / 1024}Kb. Current size is ${(file.size / 1024).toFixed(2)}Kb.`);
      resetInput();

      return;
    }

    // Check type - image/png -> [image, png]
    if (file && !ACCEPTED_FILE_TYPES.has(file.type.split('/')[1])) {
      setTypeError(`File type is not supported. Accepted types: ${[...ACCEPTED_FILE_TYPES].join(', ')}`);
      resetInput();

      return;
    }

    // Set Preview
    if (file) {
      setImageSrcPreview(URL.createObjectURL(file));
    }
  };

  // For reset button
  const handleResetInput = () => {
    setSizeError(null);
    setTypeError(null);
    setImageSrcPreview(null);
    resetInput();
  };

  return (
    <div className="mb-4">
      <label htmlFor="customer" className="mb-2 block text-sm font-medium">
        Upload Avatar{' '}
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
            ref={inputRef}
            disabled={isPending}
            onChange={handleChange}
            accept=".jpg, .jpeg, .png, .webp"
            max-size="65536" // 64Kb = 64 * 1024
            placeholder="select your avatar"
            aria-describedby="avatar-file-error"
            className="file:mr-4 text-xs file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Preview */}
        {imageSrcPreview && (
          <div className="flex gap-5 my-4">
            <img className=" rounded-full border-2 border-blue-400 object-cover w-24 h-24" src={imageSrcPreview} alt="preview" />
            <Button
              type="button"
              onClick={handleResetInput}
              style={{ color: '#4b5563' }}
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
              Reset
            </Button>
          </div>
        )}

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
