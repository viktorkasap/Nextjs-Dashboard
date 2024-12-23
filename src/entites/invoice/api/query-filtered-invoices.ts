// import { sql } from '@vercel/postgres';
//
// import { ITEMS_PER_PAGE } from '../constants';
// import { InvoicesTable } from '../types';
//
// interface GetFilteredInvoicesProps {
//   query: string;
//   currentPage: number;
// }
//
// export const queryFilteredInvoices = async ({ query, currentPage }: GetFilteredInvoicesProps) => {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;
//
//   try {
//     const invoices = await sql<InvoicesTable>`
//       SELECT
//         invoices.id,
//         invoices.amount,
//         invoices.date,
//         invoices.status,
//         customers.name,
//         customers.email,
//         customers.image_url
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       WHERE
//         customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`} OR
//         invoices.amount::text ILIKE ${`%${query}%`} OR
//         invoices.date::text ILIKE ${`%${query}%`} OR
//         invoices.status ILIKE ${`%${query}%`}
//       ORDER BY invoices.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;
//
//     return invoices.rows;
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error('Invoices Database Error:', error);
//     throw new Error('Failed to fetch invoices.');
//   }
// };

import { db } from '@/shared/db';

import { ITEMS_PER_PAGE } from '../constants';

interface GetFilteredInvoicesProps {
  query: string;
  currentPage: number;
}

export const queryFilteredInvoices = async ({ query, currentPage }: GetFilteredInvoicesProps) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const queryNumber = parseFloat(query);
  const queryDate = new Date(query);
  const isValidDate = !isNaN(queryDate.getTime());

  try {
    const invoices = await db.invoice.findMany({
      where: {
        OR: [
          { customer: { name: { contains: query, mode: 'insensitive' } } },
          { customer: { email: { contains: query, mode: 'insensitive' } } },
          ...(isNaN(queryNumber) ? [] : [{ amount: { equals: queryNumber } }]),
          ...(isValidDate ? [{ date: { equals: queryDate } }] : []),
          { status: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return invoices.map((invoice) => ({
      ...invoice,
      name: invoice.customer.name,
      email: invoice.customer.email,
      image_url: invoice.customer.imageUrl,
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Invoices Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
};
