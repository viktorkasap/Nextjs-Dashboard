import { Suspense } from 'react';

import { InvoicesTable, queryFilteredInvoices } from '@/entites/invoice';
import { CustomerAvatarServer } from '@/features/customer-avatar';
import { InvoicesTableSkeleton } from '@/shared/ui';

import { DesktopTableRow, MobileTableRow, DeleteInvoice, UpdateInvoice, StatusInvoice } from './ui';

interface TableProps {
  query: string;
  currentPage: number;
}

export const Table = ({ query, currentPage }: TableProps) => {
  return (
    <>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <TableView query={query} currentPage={currentPage} />
      </Suspense>
    </>
  );
};

// TODO:
//  OK 2) Add CustomerAvatar
//  OK 3) Split tables for mobile and desktop
//  1) Add pending status for row while delete invoice
//  4) Add customer delete pending as well as invoices

const TableView = async ({ query, currentPage }: TableProps) => {
  const invoices = await queryFilteredInvoices({ query, currentPage });

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile view */}
          <MobileTable invoices={invoices} />
          {/* Desktop view */}
          <DesktopTable invoices={invoices} />
        </div>
      </div>
    </div>
  );
};

interface TableContentProps {
  invoices: InvoicesTable[];
}

const DesktopTable = ({ invoices }: TableContentProps) => {
  return (
    <table className="hidden min-w-full text-gray-900 md:table">
      <thead className="rounded-lg text-left text-sm font-normal">
        <tr>
          <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
            Customer
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Email
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Amount
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Date
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Status
          </th>
          <th scope="col" className="relative py-3 pl-6 pr-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {/* TODO: Make TR as client, it allows show pending effect */}
        {invoices?.map((invoice) => (
          <DesktopTableRow
            key={`${invoice.id}-${invoice.email}-desk`}
            invoice={invoice}
            DeleteInvoice={DeleteInvoice}
            renderUpdateInvoice={<UpdateInvoice id={invoice.id} />}
            renderStatusInvoice={<StatusInvoice status={invoice.status} />}
            renderCustomerAvatar={<CustomerAvatarServer name={invoice.name} src={invoice.image_url} />}
          />
        ))}
      </tbody>
    </table>
  );
};

const MobileTable = ({ invoices }: TableContentProps) => {
  return (
    <div className="md:hidden">
      {invoices?.map((invoice) => (
        <MobileTableRow
          key={`${invoice.id}-${invoice.email}-mob`}
          invoice={invoice}
          DeleteInvoice={DeleteInvoice}
          renderUpdateInvoice={<UpdateInvoice id={invoice.id} />}
          renderStatusInvoice={<StatusInvoice status={invoice.status} />}
          renderCustomerAvatar={<CustomerAvatarServer name={invoice.name} src={invoice.image_url} />}
        />
      ))}
    </div>
  );
};
