import { sql } from '@vercel/postgres';

import { Revenue } from '../types';

export async function getRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database Error:', error);

    throw new Error('Failed to fetch revenue data.');
  }
}
