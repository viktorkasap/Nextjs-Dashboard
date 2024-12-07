import { sql } from '@vercel/postgres';

import { Revenue } from '../types';

export async function queryRevenue() {
  const start = performance.now();

  try {
    // Artificially delay a response for demo purposes.
    // eslint-disable-next-line no-console
    console.log('Fetching revenue data...:', `${start.toFixed(2)}ms`);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    const end = performance.now();
    const timeTaken = end - start;

    // eslint-disable-next-line no-console
    console.log('Data fetch completed after 3 seconds:', `${end.toFixed(2)}ms`);
    // eslint-disable-next-line no-console
    console.log('Pause time:', `${timeTaken.toFixed(2)}ms`);

    return data.rows;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database Error:', error);

    throw new Error('Failed to fetch revenue data.');
  }
}
