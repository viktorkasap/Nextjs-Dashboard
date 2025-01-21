import { db } from '@/shared/db';

import { Invoice } from '../types';

export const queryInvoiceById = async (id: string): Promise<Invoice | undefined> => {
  let invoice;

  try {
    invoice = await db.invoice.findUnique({
      where: { id },
      select: {
        id: true,
        customerId: true,
        amount: true,
        date: true,
        status: true,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }

  if (!invoice) {
    throw new Error('Invoice not found');
  }

  return { ...invoice, amount: invoice.amount / 100 };
};
