import { sql } from '@vercel/postgres';

import { ITEMS_PER_PAGE } from '../constants';
import { Customer } from '../types';

interface GetFilteredCustomersProps {
  query: string;
  currentPage: number;
}

export const queryFilteredCustomers = async ({ query, currentPage }: GetFilteredCustomersProps) => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const customers = await sql<Customer>`
      SELECT
        customers.name,
        customers.email,
        customers.image_url
      FROM customers
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
      ORDER BY customers.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return customers.rows;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Customers Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
};
