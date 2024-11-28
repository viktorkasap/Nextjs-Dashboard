import { sql } from '@vercel/postgres';

import { InvoicesTable } from '@/entites/invoice';

interface GetFilteredInvoicesProps {
  query: string;
  currentPage: number;
}

const ITEMS_PER_PAGE = 6;

export const getFilteredInvoices = async ({ query, currentPage }: GetFilteredInvoicesProps) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Invoices Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
};
