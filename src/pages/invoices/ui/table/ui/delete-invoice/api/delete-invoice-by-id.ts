'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

/**
 * Asynchronously deletes an invoice by its unique identifier.
 *
 * @param {string} id - The unique identifier of the invoice to be deleted.
 * @returns {Promise<{ message: string } | Error>} Resolves with a success message if the deletion is successful or rejects with an Error if the operation fails.
 * @throws {Error} Throws an error if the deletion process encounters any issues.
 */
export const deleteInvoiceById = async (id: string): Promise<{ message: string } | Error> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    await queryDeleteAction(id);

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
 *
 * @param {string} id - The unique identifier of the invoice to be deleted.
 * @returns {Promise<unknown>} A Promise that resolves with the result of the SQL query execution.
 */
const queryDeleteAction = async (id: string): Promise<unknown> => {
  return await sql`DELETE FROM invoices WHERE id = ${id}`;
};
