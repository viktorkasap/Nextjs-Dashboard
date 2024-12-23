'use server';

// import { sql } from '@vercel/postgres';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { db } from '@/shared/db';

type StateErrors = {
  name?: string[];
  email?: string[];
  avatar?: string[];
};

export type State = {
  errors?: StateErrors;
  message?: string | null;
};

const FormDataSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  avatar: z.string(),
});

const CreateCustomerSchema = FormDataSchema;

export const createCustomer = async (_prevState: State, formData: FormData) => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const validatedFields = CreateCustomerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    avatar: formData.get('avatar'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customer',
    };
  }

  const { name, email, avatar } = validatedFields.data;

  // eslint-disable-next-line no-console
  console.log('Created customer data:', { name, email, avatar });

  try {
    await queryCreate({ name, email, imageUrl: avatar });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Create customer error:', (error as Error).message);

    // throw new Error('Failed to create invoice');
    return { message: 'Database Error: Failed to Create Customer.' };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
};

interface QueryCreateProps {
  name: string;
  email: string;
  imageUrl: string;
}

const queryCreate = async ({ name, email, imageUrl }: QueryCreateProps) => {
  try {
    return await db.customer.create({
      data: {
        name,
        email,
        imageUrl,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Create Customer Error:', error);
    throw new Error('Failed to create a new customer.');
  }
};
