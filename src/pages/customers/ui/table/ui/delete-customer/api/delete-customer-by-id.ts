'use server';

import { sql } from '@vercel/postgres';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { expirePath } from 'next/cache';

export type State = {
  error?: string | null;
  message?: string | null;
  success: boolean;
};

export const deleteCustomerById = async (
  _prevState: State,
  customerId: string,
): Promise<{ success: boolean; message?: string; error?: string }> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    await deleteAction(customerId);

    expirePath('/dashboard/invoices');
    expirePath('/dashboard/customers');

    return { success: true, message: 'Customer was deleted successfully.' };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Delete customer error:', (error as Error).message);

    return { success: false, error: `Failed to delete customer with id ${customerId}` };
  }
};

const deleteAction = async (customerId: string) => {
  try {
    await sql`BEGIN;`;

    // 1) Delete customer's invoices
    await sql`DELETE FROM invoices WHERE customer_id = ${customerId};`;

    // 2) Delete customer
    await sql`DELETE FROM customers WHERE id = ${customerId};`;

    await sql`COMMIT;`;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Transaction failed: ', error);
    await sql`ROLLBACK;`;
    throw error;
  }
};
