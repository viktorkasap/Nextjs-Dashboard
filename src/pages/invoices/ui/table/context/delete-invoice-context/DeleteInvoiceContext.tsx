'use client';

import { createContext, useState, ReactNode } from 'react';

interface DeleteInvoiceContextData {
  isDeleting: boolean;
  setIsDeleting: (_isDeleting: boolean) => void;
}

/**
 * Context for managing the deletion of invoices within the application.
 *
 * 💅 Helps show the UI effect of deleting an invoice in an entire table row.
 */
export const DeleteInvoiceContext = createContext<DeleteInvoiceContextData | undefined>(undefined);

// Provider
export const DeleteInvoiceProvider = ({ children }: { children: ReactNode }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return <DeleteInvoiceContext.Provider value={{ isDeleting, setIsDeleting }}>{children}</DeleteInvoiceContext.Provider>;
};
