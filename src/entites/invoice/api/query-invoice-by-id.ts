import { db } from '@/shared/db';

import { Invoice } from '../types';

export const queryInvoiceById = async (id: string): Promise<Invoice | undefined> => {
  try {
    const invoice = await db.invoice.findUnique({
      where: { id },
      select: {
        id: true,
        customerId: true,
        amount: true,
        date: true,
        status: true,
      },
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    if (invoice) {
      return { ...invoice, amount: invoice.amount / 100 };
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
};
