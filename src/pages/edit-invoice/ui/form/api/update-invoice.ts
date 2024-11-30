'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { EInvoiceStatus } from '@/entites/invoice';

const FormDataSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum([EInvoiceStatus.Pending, EInvoiceStatus.Paid]),
  date: z.string(),
});

const CreateInvoiceSchema = FormDataSchema.omit({ date: true });

export const updateInvoice = async (invoiceId: string, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const { customerId, amount, status, id } = CreateInvoiceSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    id: formData.get('invoiceId'), // double of `invoiceId` props for debugging
  });

  const amountInCents = amount * 100;
  const date = new Date().toDateString().split('T')[0];

  // eslint-disable-next-line no-console
  console.log({ customerId, amount, amountInCents, status, date, invoiceId, id });

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
};
