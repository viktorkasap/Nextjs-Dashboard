'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/shared/db';

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

    revalidatePath('/dashboard/invoices');
    revalidatePath('/dashboard/customers');

    return { success: true, message: 'Customer was deleted successfully.' };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Delete customer error:', (error as Error).message);

    return { success: false, error: `Failed to delete customer with id ${customerId}` };
  }
};

const deleteAction = async (customerId: string) => {
  try {
    await db.$transaction(async (prisma) => {
      // 1) Delete customer's invoices
      await prisma.invoice.deleteMany({
        where: {
          customerId,
        },
      });

      // 2) Delete customer
      await prisma.customer.delete({
        where: {
          id: customerId,
        },
      });
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Transaction failed: ', error);
    throw new Error('Failed to complete the transaction.');
  }
};
