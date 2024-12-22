import { Suspense } from 'react';

import { CustomerTable, queryFilteredCustomers } from '@/entites/customer';
import { CustomersTableSkeleton } from '@/shared/ui';

import { DesktopTableRow, MobileTableRow, DeleteCustomer } from './ui';

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
            <DesktopTable customers={customers} />
            <MobileTable customers={customers} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface TableContentProps {
  customers: CustomerTable[];
}

// Table Desktop
const DesktopTable = ({ customers }: TableContentProps) => {
  return (
    <table className="hidden min-w-full rounded-md text-gray-900 md:table">
      <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
        <tr>
          <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
            Name
          </th>
          <th scope="col" className="px-1 py-5 font-medium">
            Email
          </th>
          <th scope="col" className="px-1 py-5 font-medium">
            Total Invoices
          </th>
          <th scope="col" className="px-1 py-5 font-medium">
            Total Pending
          </th>
          <th scope="col" className="px-1 py-5 font-medium">
            Total Paid
          </th>
          <th scope="col" className="relative py-3 pl-6 pr-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200 text-gray-900">
        {customers.map((customer) => (
          <DesktopTableRow
            key={`${customer.name}-${customer.email}-desk`}
            customer={customer}
            renderDeleteButton={<DeleteCustomer customerId={customer.id} />}
          />
        ))}
      </tbody>
    </table>
  );
};

// Table Mobile
const MobileTable = ({ customers }: TableContentProps) => {
  return (
    <div className="md:hidden">
      {customers?.map((customer) => <MobileTableRow key={`${customer.name}-${customer.email}-mob`} customer={customer} />)}
    </div>
  );
};
