'use server';

import { signOut } from '@/entites/user';

export const signOutAction = async () => {
  await signOut();
};
