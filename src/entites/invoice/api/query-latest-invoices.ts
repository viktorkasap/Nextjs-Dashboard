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
            avatarUrl: true,
            avatarFile: true,
            email: true,
          },
        },
      },
    });

    const invoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
      name: invoice.customer.name,
      avatarUrl: invoice.customer.avatarUrl,
      avatarFile: invoice.customer.avatarFile,
      email: invoice.customer.email,
    }));

    return invoices;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database Error:', error);

    throw new Error('Failed to fetch the latest invoices.');
  }
}
