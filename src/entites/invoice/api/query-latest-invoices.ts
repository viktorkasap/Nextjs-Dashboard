// import { sql } from '@vercel/postgres';
//
// import { formatCurrency } from '@/shared/lib';
//
// import { LatestInvoiceRaw } from '../types';
// export async function queryLatestInvoices() {
//   try {
//     const data = await sql<LatestInvoiceRaw>`
//       SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       ORDER BY invoices.date DESC
//       LIMIT 5`;
//
//     const latestInvoices = data.rows.map((invoice) => ({
//       ...invoice,
//       amount: formatCurrency(invoice.amount),
//     }));
//
//     return latestInvoices;
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error('Database Error:', error);
//
//     throw new Error('Failed to fetch the latest invoices.');
//   }
// }

import { db } from '@/shared/db';
import { formatCurrency } from '@/shared/lib';

export async function queryLatestInvoices() {
  try {
    const data = await db.invoice.findMany({
      where: {},
      orderBy: { date: 'desc' },
      take: 5,
      include: {
        customer: {
          select: {
            name: true,
            imageUrl: true,
            email: true,
          },
        },
      },
    });

    const invoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
      name: invoice.customer.name,
      imageUrl: invoice.customer.imageUrl,
      email: invoice.customer.email,
    }));

    return invoices;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database Error:', error);

    throw new Error('Failed to fetch the latest invoices.');
  }
}
