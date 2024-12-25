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

export type LatestInvoice = {
  id: string;
  name: string;
  avatarUrl: string | null;
  avatarFile: Uint8Array | null;
  email: string;
  amount: string;
};

export type InvoicesTable = {
  name: string;
  email: string;
  status: string;
  date: Date;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  customerId: string;
  customer: {
    name: string;
    email: string;
    avatarUrl: string | null;
    avatarFile: Uint8Array | null;
  };
};
