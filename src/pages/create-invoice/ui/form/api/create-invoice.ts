'use server';

// import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { EInvoiceStatus, InvoiceStatus } from '@/entites/invoice';
import { db } from '@/shared/db';

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
  customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }), // gt - Greater Then
  status: z.enum([EInvoiceStatus.Pending, EInvoiceStatus.Paid], {
    invalid_type_error: 'Please select an invoice status.',
  }),
});

// const CreateInvoiceSchema = FormDataSchema.omit({ id: true, date: true });
const CreateInvoiceSchema = FormDataSchema;

export const createInvoice = async (_prevState: State, formData: FormData) => {
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
      message: 'Missing Fields. Failed to Create Invoice',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toDateString().split('T')[0];

  // eslint-disable-next-line no-console
  console.log('Created invoice data:', { customerId, amount, amountInCents, status, date });

  try {
    await queryCreate({ customerId, status, amountInCents, date });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Create invoice error:', (error as Error).message);

    // throw new Error('Failed to create invoice');
    return { message: 'Database Error: Failed to Create Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
};

interface QueryCreateProps {
  customerId: string;
  amountInCents: number;
  status: InvoiceStatus;
  date: string;
}

const queryCreate = async ({ customerId, amountInCents, status, date }: QueryCreateProps) => {
  try {
    return await db.invoice.create({
      data: {
        customerId,
        amount: amountInCents,
        status,
        date: new Date(date),
      },
    }); // Возвращает объект нового инвойса
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Create Invoice Error:', error);
    throw new Error('Failed to create a new invoice.');
  }
};
