import { useContext } from 'react';

import { DeleteInvoiceContext } from './DeleteInvoiceContext';

export const useDeleteInvoiceContext = () => {
  const context = useContext(DeleteInvoiceContext);

  if (context === undefined) {
    throw new Error('useDeleteInvoice must be used within a DeleteInvoiceProvider');
  }

  return context;
};
