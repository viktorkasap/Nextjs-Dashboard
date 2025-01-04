'use server';

import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { db } from '@/shared/db';

type StateErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

export type State = {
  errors?: StateErrors;
  message: string;
};

const FormDataSchema = z
  .object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const CreateUserSchema = FormDataSchema;

export const createUser = async (_prevState: State, formData: FormData) => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const validatedFields = CreateUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('password-confirm'),
  });

  // 1) Validate fields
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User',
    };
  }

  const { name, email, password } = validatedFields.data;

  // 2) Check existing user
  const existingUser = await db.user.findFirst({ where: { email } });
  if (existingUser) {
    return {
      errors: {
        name: undefined,
        email: ['Email already exists'],
        password: undefined,
        confirmPassword: undefined,
      },
      message: 'Email already exists',
    };
  }

  // 3) Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // eslint-disable-next-line no-console
  console.log('Created customer data:', { name, email, password, hashedPassword });

  try {
    await queryCreateUser({ name, email, password: hashedPassword });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Create user error:', (error as Error).message);

    return { message: 'Database Error: Failed to create user.' };
  }

  redirect(`/sign-in?userCreated=true&email=${email}`);
};

interface QueryCreateUserProps {
  name: string;
  email: string;
  password: string;
}

const queryCreateUser = async ({ name, email, password }: QueryCreateUserProps) => {
  try {
    return await db.user.create({ data: { name, email, password } });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Update Customer Error:', error);
    throw new Error('Failed to create a new user.');
  }
};
