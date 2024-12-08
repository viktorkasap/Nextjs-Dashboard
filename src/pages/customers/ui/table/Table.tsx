import { Suspense } from 'react';

import Image from 'next/image';

import { Customer, queryFilteredCustomers } from '@/entites/customer';
import { CustomersTableSkeleton } from '@/shared/ui';

interface TableProps {
  query: string;
  currentPage: number;
}

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
  customers: Customer[];
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

const DesktopTableRow = ({ customer }: { customer: Customer }) => {
  return (
    <tr key={customer.id} className="group">
      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
        <div className="flex items-center gap-3">
          <Image src={customer.image_url} className="rounded-full" alt={`${customer.name}'s profile picture`} width={28} height={28} />
          <p>{customer.name}</p>
        </div>
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{customer.email}</td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{/* {customer.total_invoices} */}</td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{/* {customer.total_pending} */}</td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
        {/* {customer.total_paid} */}
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

const MobileTableRow = ({ customer }: { customer: Customer }) => {
  return (
    <div key={customer.id} className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="mb-2 flex items-center">
            <div className="flex items-center gap-3">
              <Image width={28} height={28} src={customer.image_url} className="rounded-full" alt={`${customer.name}'s profile picture`} />
              <p>{customer.name}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">{customer.email}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between border-b py-5">
        <div className="flex w-1/2 flex-col">
          <p className="text-xs">Pending</p>
          {/* <p className="font-medium">{customer.total_pending}</p> */}
        </div>
        <div className="flex w-1/2 flex-col">
          <p className="text-xs">Paid</p>
          {/* <p className="font-medium">{customer.total_paid}</p> */}
        </div>
      </div>
      <div className="pt-4 text-sm">{/* <p>{customer.total_invoices} invoices</p> */}</div>
    </div>
  );
};