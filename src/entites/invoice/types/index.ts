/* eslint-disable no-unused-vars */
import { InvoiceStatus } from '@prisma/client';

export type Invoice = {
  id: string;
  customerId: string;
  amount: number;
  date: Date;
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
