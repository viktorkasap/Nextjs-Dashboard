import { Suspense } from 'react';

import { CustomerTable, queryFilteredCustomers } from '@/entites/customer';
import { formatCurrency } from '@/shared/lib';
import { CustomersTableSkeleton } from '@/shared/ui';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { CustomerAvatarClient, CustomerAvatarServer } from './ui';

interface TableProps {
  query: string;
  currentPage: number;
}

// 1) TODO: Add delete customer button
// 1) TODO: Add edit customer button + page

export const Table = ({ query, currentPage }: TableProps) => {
  // FIXME: Update Customer Table Skeleton properly

  return (
    <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
      <TableView query={query} currentPage={currentPage} />
    </Suspense>
  );
};

const TableView = async ({ query, currentPage }: TableProps) => {
  const customers = await queryFilteredCustomers({ query, currentPage });

  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <TableDesktop customers={customers} />
            <TableMobile customers={customers} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface TableContentProps {
  customers: CustomerTable[];
}

interface TableRowProps {
  customer: CustomerTable;
}

// Table Desktop
const TableDesktop = ({ customers }: TableContentProps) => {
  return (
    <table className="hidden min-w-full rounded-md text-gray-900 md:table">
      <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
        <tr>
          <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
            Name
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Email
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Total Invoices
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Total Pending
          </th>
          <th scope="col" className="px-4 py-5 font-medium">
            Total Paid
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200 text-gray-900">
        {customers.map((customer) => (
          <DesktopTableRow key={`${customer.name}-${customer.email}-desk`} customer={customer} />
        ))}
      </tbody>
    </table>
  );
};

const DesktopTableRow = ({ customer }: TableRowProps) => {
  return (
    <tr key={customer.id} className="group">
      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
        <div className="flex items-center gap-3">
          {/* Server component */}
          <CustomerAvatarServer name={customer.name} src={customer.image_url} />
          {/* Client component */}
          {/* <CustomerAvatarClient name={customer.name} src={customer.image_url} /> */}
          <p>{customer.name}</p>
        </div>
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{customer.email}</td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm"> {customer.totalInvoices}</td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{formatCurrency(customer.totalPending)}</td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
        {formatCurrency(customer.totalPaid)}
      </td>
    </tr>
  );
};

// Table Mobile
const TableMobile = ({ customers }: TableContentProps) => {
  return (
    <div className="md:hidden">
      {customers?.map((customer) => <MobileTableRow key={`${customer.name}-${customer.email}-mob`} customer={customer} />)}
    </div>
  );
};

const MobileTableRow = ({ customer }: TableRowProps) => {
  return (
    <div key={customer.id} className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="mb-2 flex items-center">
            <div className="flex items-center gap-3">
              {/* Server component */}
              <CustomerAvatarServer name={customer.name} src={customer.image_url} />
              {/* Client component */}
              {/* <CustomerAvatarClient name={customer.name} src={customer.image_url} /> */} <p>{customer.name}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">{customer.email}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between border-b py-5">
        <div className="flex w-1/2 flex-col">
          <p className="text-xs">Pending</p>
          <p className="font-medium">{formatCurrency(customer.totalPending)}</p>
        </div>
        <div className="flex w-1/2 flex-col">
          <p className="text-xs">Paid</p>
          <p className="font-medium">{formatCurrency(customer.totalPaid)}</p>
        </div>
      </div>
      <div className="pt-4 text-sm">
        <p>{customer.totalInvoices} invoices</p>
      </div>
    </div>
  );
};
