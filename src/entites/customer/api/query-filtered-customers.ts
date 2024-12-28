import { InvoiceStatus } from '@prisma/client';

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
      const totalPending = customer.invoices.reduce(
        (sum, invoice) => (invoice.status === InvoiceStatus.Pending ? sum + invoice.amount : sum),
        0,
      );
      const totalPaid = customer.invoices.reduce((sum, invoice) => (invoice.status === InvoiceStatus.Paid ? sum + invoice.amount : sum), 0);

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        avatarUrl: customer.avatarUrl,
        avatarFile: customer.avatarFile,
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
