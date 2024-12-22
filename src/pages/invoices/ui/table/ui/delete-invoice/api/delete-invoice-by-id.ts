'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

/**
 * Asynchronously deletes an invoice by its unique identifier.
 */
export const deleteInvoiceById = async (invoiceId: string): Promise<{ message: string } | Error> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    await queryDeleteAction(invoiceId);

    revalidatePath('/dashboard/invoices');

    return { message: 'Invoice was deleted successfully.' };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Delete invoice error:', (error as Error).message);

    throw new Error('Failed to delete Invoice.');
  }
};

/**
 * Asynchronous function to delete a record from the 'invoices' table based on the provided ID.
 */
const queryDeleteAction = async (invoiceId: string): Promise<unknown> => {
  return await sql`DELETE FROM invoices WHERE id = ${invoiceId}`;
};
