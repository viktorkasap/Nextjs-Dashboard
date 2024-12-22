'use client';

import { ComponentType, memo, ReactNode } from 'react';

import clsx from 'clsx';

import { InvoicesTable } from '@/entites/invoice';
import { formatCurrency, formatDateToLocal } from '@/shared/lib';

import { useDeleteInvoiceContext } from '../../context';
import { DeleteInvoiceProps } from '../../types';

interface DesktopTableRowProps {
  invoice: InvoicesTable;
  renderStatusInvoice: ReactNode;
  renderCustomerAvatar: ReactNode;
  renderUpdateInvoice: ReactNode;
  DeleteInvoice: ComponentType<DeleteInvoiceProps>;
}

export const DesktopTableRow = memo(
  ({ invoice, renderCustomerAvatar, renderStatusInvoice, renderUpdateInvoice, DeleteInvoice }: DesktopTableRowProps) => {
    const { isDeleting } = useDeleteInvoiceContext();

    return (
      <tr
        className={clsx(
          'w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg',
          { 'opacity-50': isDeleting },
        )}>
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex items-center gap-3">
            {renderCustomerAvatar}
            <p>{invoice.name}</p>
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-3">{invoice.email}</td>
        <td className="whitespace-nowrap px-3 py-3">{formatCurrency(invoice.amount)}</td>
        <td className="whitespace-nowrap px-3 py-3">{formatDateToLocal(invoice.date)}</td>
        <td className="whitespace-nowrap px-3 py-3">{renderStatusInvoice}</td>
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex justify-end gap-3">
            {renderUpdateInvoice}
            <DeleteInvoice invoiceId={invoice.id} />
          </div>
        </td>
      </tr>
    );
  },
);
