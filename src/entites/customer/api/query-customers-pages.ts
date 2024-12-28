import { db } from '@/shared/db';

import { ITEMS_PER_PAGE } from '../constants';

export const queryCustomersPages = async (query: string) => {
  try {
    const count = await db.customer.count({
      where: {
        OR: [{ name: { contains: query, mode: 'insensitive' } }, { email: { contains: query, mode: 'insensitive' } }],
      },
    });

    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Pages Customers Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
};
