'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { EInvoiceStatus, InvoiceStatus } from '@/entites/invoice';

const FormDataSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum([EInvoiceStatus.Pending, EInvoiceStatus.Paid]),
  date: z.string(),
});

const CreateInvoiceSchema = FormDataSchema.omit({ id: true, date: true });

export const createInvoice = async (formData: FormData) => {
  const { customerId, amount, status } = CreateInvoiceSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toDateString().split('T')[0];

  // eslint-disable-next-line no-console
  console.log('Created invoice data:', { customerId, amount, amountInCents, status, date });

  try {
    await create({ customerId, status, amountInCents, date });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Create invoice error:', (error as Error).message);

    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
};

interface CreateProps {
  customerId: string;
  amountInCents: number;
  status: InvoiceStatus;
  date: string;
}

const create = async ({ customerId, amountInCents, status, date }: CreateProps) => {
  return await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
};
