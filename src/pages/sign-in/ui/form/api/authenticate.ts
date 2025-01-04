'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/entites/user';

export const authenticate = async (_prevState: string | undefined, formData: FormData) => {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials 2';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
};
