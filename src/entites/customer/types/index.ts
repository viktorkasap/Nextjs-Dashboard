export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type CustomerTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  totalInvoices: number;
  totalPending: number;
  totalPaid: number;
};
