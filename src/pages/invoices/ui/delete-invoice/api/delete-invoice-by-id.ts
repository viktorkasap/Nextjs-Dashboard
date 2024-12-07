'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export const deleteInvoiceById = async (id: string) => {
  try {
    await queryDeleteAction(id);
    revalidatePath('/dashboard/invoices');

    return { message: 'Deleted Invoice.' };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Delete invoice error:', (error as Error).message);

    throw new Error('Failed to delete Invoice.');
    // return { message: 'Database Error: Failed to Delete Invoice' };
  }
};

const queryDeleteAction = async (id: string) => {
  return await sql`DELETE FROM invoices WHERE id = ${id}`;
};
