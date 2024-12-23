// import { sql } from '@vercel/postgres';
//
// import { ITEMS_PER_PAGE } from '../constants';
//
// export const queryInvoicesPages = async (query: string) => {
//   try {
//     const count = await sql`SELECT COUNT(*)
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE
//       customers.name ILIKE ${`%${query}%`} OR
//       customers.email ILIKE ${`%${query}%`} OR
//       invoices.amount::text ILIKE ${`%${query}%`} OR
//       invoices.date::text ILIKE ${`%${query}%`} OR
//       invoices.status ILIKE ${`%${query}%`}
//   `;
//
//     return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error('Pages Invoices Database Error:', error);
//     throw new Error('Failed to fetch total number of invoices.');
//   }
// };

import { db } from '@/shared/db';

import { ITEMS_PER_PAGE } from '../constants';

export const queryInvoicesPages = async (query: string) => {
  try {
    const count = await db.invoice.count({
      where: {
        OR: [
          { customer: { name: { contains: query, mode: 'insensitive' } } },
          { customer: { email: { contains: query, mode: 'insensitive' } } },
          { amount: { equals: query ? parseInt(query, 10) : undefined } },
          { date: { equals: query ? new Date(query) : undefined } },
          { status: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Pages Invoices Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
};
