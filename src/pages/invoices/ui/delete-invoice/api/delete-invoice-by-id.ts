'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export type State = {
  error?: string | null;
  message?: string | null;
};

/**
 * Deletes an invoice by its ID.
 *
 * This asynchronous function performs the following actions:
 * 1. Introduces a simulated delay to mimic real-world operation latency.
 * 2. Executes a query to delete the specified invoice from the database.
 * 3. Revalidates the relevant path to ensure accurate and up-to-date UI rendering.
 * 4. Returns a success message upon successful deletion or an error message in case of a failure.
 *
 * @param {State} _prevState - The previous state, typically unused in this function.
 * @param {string} id - The unique identifier of the invoice to be deleted.
 * @returns {Promise<{message?: string, error?: string}>} - A promise resolving to either a success message or an error object containing the failure reason.
 */
export const deleteInvoiceById = async (_prevState: State, id: string): Promise<{ message?: string; error?: string }> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    await queryDeleteAction(id);

    revalidatePath('/dashboard/invoices');

    return { message: 'Invoice was deleted successfully.' };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Delete invoice error:', (error as Error).message);

    // throw new Error('Failed to delete Invoice.');
    return { error: 'Database Error: Failed to Delete Invoice' };
  }
};

/**
 * Asynchronous function to delete a record from the 'invoices' table based on the provided ID.
 *
 * @param {string} id - The unique identifier of the invoice to be deleted.
 * @returns {Promise<any>} A Promise that resolves with the result of the SQL query execution.
 */
const queryDeleteAction = async (id: string) => {
  return await sql`DELETE FROM invoices WHERE id = ${id}`;
};
