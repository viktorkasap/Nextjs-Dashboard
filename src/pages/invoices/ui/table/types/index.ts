export interface DeleteInvoiceProps {
  id: string;
  // eslint-disable-next-line no-unused-vars
  onDeletePending: (status: boolean) => void;
}

export interface UpdateInvoiceProps {
  id: string;
}

export interface StatusInvoiceProps {
  status: string;
}

export interface CustomerAvatarProps {
  name: string;
  src: string;
}
