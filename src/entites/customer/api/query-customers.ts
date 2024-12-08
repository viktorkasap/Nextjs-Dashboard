import { sql } from '@vercel/postgres';

import { CustomerField } from '../types';

export const queryCustomers = async () => {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
};
