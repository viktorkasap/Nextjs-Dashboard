'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { db } from '@/shared/db';

type StateErrors = {
  id?: string[];
  name?: string[];
  email?: string[];
  avatarUrl?: string[];
  avatarFile?: string[];
};

export type State = {
  errors?: StateErrors;
  message: string;
};

const MAX_UPLOAD_SIZE = 64 * 1024; // 64Kb
const ACCEPTED_FILE_TYPES = new Set(['jpg', 'jpeg', 'png', 'webp']);

// Validate primitives
const FormDataSchema = z.object({
  id: z.string().min(6, { message: 'ID is required' }),
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  avatarUrl: z.string(),
});

const UpdateCustomerSchema = FormDataSchema;

export const updateCustomer = async (_prevState: State, formData: FormData) => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // 1) Validate Primitives
  const validatedFields = UpdateCustomerSchema.safeParse({
    id: formData.get('customer-id'),
    name: formData.get('name'),
    email: formData.get('email'),
    avatarUrl: formData.get('avatar-url'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Customer',
    };
  }

  const { id, name, email, avatarUrl } = validatedFields.data;

  // 2) Validation Avatar File
  const avatarFile = formData.get('avatar-file');
  let avatarBuffer: Buffer | undefined;

  if (avatarFile instanceof Blob && avatarFile.size > 0) {
    // 1) Check file size
    if (avatarFile.size > MAX_UPLOAD_SIZE) {
      return {
        errors: {
          id: undefined,
          name: undefined,
          email: undefined,
          avatarUrl: undefined,
          avatarFile: [`File size must be < ${MAX_UPLOAD_SIZE / 1024}KB`],
        },
        message: 'File too large',
      };
    }

    // 2) Check file types
    const extension = avatarFile.type.split('/')[1];
    if (!ACCEPTED_FILE_TYPES.has(extension)) {
      return {
        errors: {
          name: undefined,
          email: undefined,
          avatarUrl: undefined,
          avatarFile: [`Accepted file types: ${[...ACCEPTED_FILE_TYPES].join(', ')}`],
        },
        message: 'Wrong file type',
      };
    }

    // 3) Blob
    const arrayBuffer = await avatarFile.arrayBuffer();
    avatarBuffer = Buffer.from(arrayBuffer);
  }

  // eslint-disable-next-line no-console
  console.log('Update customer data:', { name, email, avatarUrl, avatarBuffer });

  try {
    await queryUpdate({ id, name, email, avatarUrl, avatarFile: avatarBuffer });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Update customer error:', (error as Error).message);

    return { message: 'Database Error: Failed to Update Customer.' };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
};

interface QueryUpdateProps {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  avatarFile: Uint8Array | undefined;
}

const queryUpdate = async ({ id, name, email, avatarUrl, avatarFile }: QueryUpdateProps) => {
  try {
    return await db.customer.update({
      where: { id },
      data: {
        name,
        email,
        avatarUrl,
        avatarFile,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Update Customer Error:', error);
    throw new Error('Failed to update customer.');
  }
};
