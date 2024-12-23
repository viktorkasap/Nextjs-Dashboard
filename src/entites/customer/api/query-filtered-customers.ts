// import { sql } from '@vercel/postgres';
//
// import { ITEMS_PER_PAGE } from '../constants';
// import { CustomerTable } from '../types';
//
// interface GetFilteredCustomersProps {
//   query: string;
//   currentPage: number;
// }
//
// export const queryFilteredCustomers = async ({ query, currentPage }: GetFilteredCustomersProps) => {
//   // Fake delay
//   await new Promise((resolve) => setTimeout(resolve, 3000));
//
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;
//
//   try {
//     const customers = await sql<CustomerTable>`
//       SELECT
//         customer.id,
//         customer.name,
//         customer.email,
//         customer.image_url,
//         COUNT(invoice.id) AS "totalInvoices",
//         COALESCE(SUM(CASE WHEN invoice.status = 'pending' THEN invoice.amount ELSE 0 END), 0) AS "totalPending",
//         COALESCE(SUM(CASE WHEN invoice.status = 'paid' THEN invoice.amount ELSE 0 END), 0) AS "totalPaid"
//       FROM customers customer
//              LEFT JOIN invoices invoice ON customer.id = invoice.customer_id
//       WHERE customer.name ILIKE ${`%${query}%`} OR customer.email ILIKE ${`%${query}%`}
//       GROUP BY customer.id, customer.name, customer.email, customer.image_url
//       ORDER BY customer.name DESC
//       LIMIT ${ITEMS_PER_PAGE}
//         OFFSET ${offset};
//     `;
//
//     return customers.rows;
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error('Customers Database Error:', error);
//     throw new Error('Failed to fetch customers.');
//   }
// };

import { db } from '@/shared/db';

import { ITEMS_PER_PAGE } from '../constants';

interface GetFilteredCustomersProps {
  query: string;
  currentPage: number;
}

export const queryFilteredCustomers = async ({ query, currentPage }: GetFilteredCustomersProps) => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const customers = await db.customer.findMany({
      where: {
        OR: [{ name: { contains: query, mode: 'insensitive' } }, { email: { contains: query, mode: 'insensitive' } }],
      },
      include: {
        invoices: {
          select: {
            amount: true,
            status: true,
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: {
        name: 'desc',
      },
    });

    return customers.map((customer) => {
      const totalInvoices = customer.invoices.length;
      const totalPending = customer.invoices.reduce((sum, invoice) => (invoice.status === 'pending' ? sum + invoice.amount : sum), 0);
      const totalPaid = customer.invoices.reduce((sum, invoice) => (invoice.status === 'paid' ? sum + invoice.amount : sum), 0);

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        imageUrl: customer.imageUrl,
        totalInvoices,
        totalPending,
        totalPaid,
      };
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Customers Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
};
