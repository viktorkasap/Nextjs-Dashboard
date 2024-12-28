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
    const invoiceStatusPromise = db.invoice.aggregate({
      _sum: { amount: true },
      where: {
        OR: [{ status: InvoiceStatus.Paid }, { status: InvoiceStatus.Pending }],
      },
    });

    const [invoiceCount, customerCount, invoiceStatus] = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = invoiceCount;
    const numberOfCustomers = customerCount;
    const totalPaidInvoices = formatCurrency(invoiceStatus._sum.amount ?? 0);
    const totalPendingInvoices = formatCurrency(invoiceStatus._sum.amount ?? 0); // Подправьте, если нужно

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
