import { Suspense } from 'react';

import { InvoicesTable, queryFilteredInvoices } from '@/entites/invoice';

import { CustomerAvatarServer } from '@/features/customer-avatar';

import { InvoicesTableSkeleton } from '@/shared/ui';

import { DeleteInvoiceProvider } from './context';
import { DesktopTableRow, MobileTableRow, DeleteInvoice, EditInvoice, StatusInvoice } from './ui';

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

const TableView = async ({ query, currentPage }: TableProps) => {
  const invoices = await queryFilteredInvoices({ query, currentPage });

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Desktop view */}
          <DesktopTable invoices={invoices} />
          {/* Mobile view */}
          <MobileTable invoices={invoices} />
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
          <DeleteInvoiceProvider key={`${invoice.id}-${invoice.email}-desk`}>
            <DesktopTableRow
              invoice={invoice}
              DeleteInvoice={DeleteInvoice}
              renderEditInvoice={<EditInvoice invoiceId={invoice.id} />}
              renderStatusInvoice={<StatusInvoice status={invoice.status} />}
              renderCustomerAvatar={
                <Avatar name={invoice.name} avatarUrl={invoice.customer.avatarUrl} avatarFile={invoice.customer.avatarFile} />
              }
            />
          </DeleteInvoiceProvider>
        ))}
      </tbody>
    </table>
  );
};

const MobileTable = ({ invoices }: TableContentProps) => {
  return (
    <div className="md:hidden">
      {invoices?.map((invoice) => (
        <DeleteInvoiceProvider key={`${invoice.id}-${invoice.email}-mob`}>
          <MobileTableRow
            invoice={invoice}
            DeleteInvoice={DeleteInvoice}
            renderEditInvoice={<EditInvoice invoiceId={invoice.id} />}
            renderStatusInvoice={<StatusInvoice status={invoice.status} />}
            renderCustomerAvatar={
              <Avatar name={invoice.name} avatarUrl={invoice.customer.avatarUrl} avatarFile={invoice.customer.avatarFile} />
            }
          />
        </DeleteInvoiceProvider>
      ))}
    </div>
  );
};

const Avatar = ({ name, avatarUrl, avatarFile }: { name: string; avatarUrl: string | null; avatarFile: Uint8Array | null }) => {
  let src = avatarUrl || '';

  if (avatarFile) {
    const base64String = Buffer.from(avatarFile).toString('base64');
    src = `data:image/png;base64,${base64String}`;
  }

  return (
    <>
      {/* 1) Server component */}
      <CustomerAvatarServer name={name} src={src} />
      {/* 2) Client component */}
      {/* <CustomerAvatarClient name={customer.name} src={avatarUrl || ''} /> */}
    </>
  );
};
