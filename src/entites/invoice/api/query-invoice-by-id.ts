import { sql } from '@vercel/postgres';

import { Invoice } from '../types';

export const queryInvoiceById = async (id: string): Promise<Invoice> => {
  try {
    const data = await sql<Invoice>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status,
        invoices.date
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
};
