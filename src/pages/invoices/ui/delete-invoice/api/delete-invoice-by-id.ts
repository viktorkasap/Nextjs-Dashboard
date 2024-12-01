'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export const deleteInvoiceById = async (id: string) => {
  // await sql`DELETE FROM invoices WHERE id = ${id}`;

  try {
    await deleteAction(id);
    revalidatePath('/dashboard/invoices');

    return { message: 'Deleted Invoice.' };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Delete invoice error:', (error as Error).message);

    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
};

const deleteAction = async (id: string) => {
  return await sql`DELETE FROM invoices WHERE id = ${id}`;
};
