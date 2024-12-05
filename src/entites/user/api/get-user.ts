import { sql } from '@vercel/postgres';

import { User } from '../types';

export const getUser = async (email: string): Promise<User | undefined> => {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;

    return user.rows[0];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
};
