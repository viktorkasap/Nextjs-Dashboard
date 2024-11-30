import { sql } from '@vercel/postgres';

import { CustomerField } from '@/entites/customer';

export const getCustomers = async () => {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;

    return customers;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
};
