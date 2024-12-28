import { db } from '@/shared/db';

export const queryCustomers = async () => {
  try {
    return await db.customer.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
};
