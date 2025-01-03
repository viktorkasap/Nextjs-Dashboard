import { db } from '@/shared/db';

import { Customer } from '../types';

export const getCustomerById = async (id: string): Promise<Customer | undefined> => {
  try {
    const customer = await db.customer.findUnique({ where: { id } });

    if (!customer) {
      throw new Error(`Customer not found id: ${id}`);
    }

    return customer;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer.');
  }
};
