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
            avatarUrl: true,
            avatarFile: true,
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
      avatarUrl: invoice.customer.avatarUrl,
      avatarFile: invoice.customer.avatarFile,
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Invoices Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
};
