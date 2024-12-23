import { db } from '@/shared/db';

import { User } from '../types';

export const queryUser = async (email: string): Promise<User | null> => {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
};
