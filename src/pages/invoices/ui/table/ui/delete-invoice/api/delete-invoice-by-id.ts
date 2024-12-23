'use server';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/binary';
import { revalidatePath } from 'next/cache';

import { db } from '@/shared/db';

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
const queryDeleteAction = async (invoiceId: string): Promise<unknown> => {
  try {
    return await db.invoice.delete({
      where: {
        id: invoiceId,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Delete Invoice Error:', error);
    // ID doesn't exist
    if ((error as PrismaClientKnownRequestError)?.code === 'P2025') {
      throw new Error('Invoice not found.');
    }
    throw new Error('Failed to delete the invoice.');
  }
};
