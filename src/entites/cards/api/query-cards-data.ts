import { InvoiceStatus } from '@prisma/client';

import { db } from '@/shared/db';
import { formatCurrency } from '@/shared/lib';

export async function queryCardsData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = db.invoice.count();
    const customerCountPromise = db.customer.count();
    const totalPaidPromise = db.invoice.aggregate({
      _sum: { amount: true },
      where: { status: InvoiceStatus.Paid },
    });
    const totalPendingPromise = db.invoice.aggregate({
      _sum: { amount: true },
      where: { status: InvoiceStatus.Pending },
    });

    const [invoiceCount, customerCount, totalPaid, totalPending] = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      totalPaidPromise,
      totalPendingPromise,
    ]);

    const numberOfInvoices = invoiceCount;
    const numberOfCustomers = customerCount;
    const totalPaidInvoices = formatCurrency(totalPaid._sum.amount ?? 0);
    const totalPendingInvoices = formatCurrency(totalPending._sum.amount ?? 0);

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database Error:', error);

    throw new Error('Failed to fetch card data.');
  }
}
