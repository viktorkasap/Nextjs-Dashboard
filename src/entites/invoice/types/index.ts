/* eslint-disable no-unused-vars */

export enum EInvoiceStatus {
  Pending = 'pending',
  Paid = 'paid',
}

export type InvoiceStatus = EInvoiceStatus.Pending | EInvoiceStatus.Paid;

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: InvoiceStatus;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  imageUrl: string | null;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  imageUrl: string | null;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  totalInvoices: number;
  totalPending: number;
  totalPaid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  totalInvoices: number;
  totalPending: string;
  totalPaid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
