import { sql } from '@vercel/postgres';

import { ITEMS_PER_PAGE } from '../constants';

export const queryCustomersPages = async (query: string) => {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM customers
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`}
  `;

    return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Pages Customers Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
};
