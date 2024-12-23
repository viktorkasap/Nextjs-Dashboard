export type Customer = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type CustomerTable = {
  id: string;
  name: string;
  email: string;
  imageUrl: string | null;
  totalInvoices: number;
  totalPending: number;
  totalPaid: number;
};
