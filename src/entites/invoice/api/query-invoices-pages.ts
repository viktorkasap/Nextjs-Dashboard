import { InvoiceStatus } from '@prisma/client';

import { db } from '@/shared/db';

import { ITEMS_PER_PAGE } from '../constants';

export const queryInvoicesPages = async (query: string) => {
  try {
    const count = await db.invoice.count({
      where: {
        /*
        OR: [
          { customer: { name: { contains: query, mode: 'insensitive' } } },
          { customer: { email: { contains: query, mode: 'insensitive' } } },
          ...(isNumber ? [{ amount: { equals: possibleNumber } }] : []),
          ...(isValidDate ? [{ date: { equals: possibleDate } }] : []),
          ...(query === 'Pending' || query === 'Paid' ? [{ status: { equals: query as InvoiceStatus } }] : []),
        ],
         */
        OR: [
          { customer: { name: { contains: query, mode: 'insensitive' } } },
          { customer: { email: { contains: query, mode: 'insensitive' } } },
          { amount: { equals: query ? parseInt(query, 10) : undefined } },
          { date: { equals: query ? new Date(query) : undefined } },
          // { status: { contains: query, mode: 'insensitive' } },
          ...(query === 'Pending' || query === 'Paid' ? [{ status: { equals: query as InvoiceStatus } }] : []),
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
