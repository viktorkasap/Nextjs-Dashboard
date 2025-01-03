export type Customer = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  avatarUrl: string | null;
  avatarFile: Uint8Array | null;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type CustomerTable = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  avatarFile: Uint8Array | null;
  totalInvoices: number;
  totalPending: number;
  totalPaid: number;
};
