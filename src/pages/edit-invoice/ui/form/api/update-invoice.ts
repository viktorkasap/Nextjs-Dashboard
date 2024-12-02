'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { EInvoiceStatus, InvoiceStatus } from '@/entites/invoice';

type StateErrors = {
  customerId?: string[];
  amount?: string[];
  status?: string[];
};

export type State = {
  errors?: StateErrors;
  message?: string | null;
};

const FormDataSchema = z.object({
  id: z.string(),
  date: z.string(),
  customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }), // gt - Greater Then
  status: z.enum([EInvoiceStatus.Pending, EInvoiceStatus.Paid], {
    invalid_type_error: 'Please select an invoice status.',
  }),
});

const CreateInvoiceSchema = FormDataSchema.omit({ id: true, date: true });

export const updateInvoice = async (id: string, _prevState: State, formData: FormData) => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const validatedFields = CreateInvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toDateString().split('T')[0];

  // eslint-disable-next-line no-console
  console.log('Updated invoice data:', { customerId, amount, amountInCents, status, date, id });

  try {
    await update({ customerId, status, id, amountInCents });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Update invoice error:', (error as Error).message);

    // throw new Error('Failed to update invoice');
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
};

interface UpdateProps {
  customerId: string;
  amountInCents: number;
  status: InvoiceStatus;
  id: string;
}

const update = async ({ customerId, status, id, amountInCents }: UpdateProps) => {
  return await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
};
