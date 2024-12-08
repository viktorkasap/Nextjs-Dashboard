import { Metadata } from 'next';

import { queryCustomersPages } from '@/entites/customer';
import { lusitana } from '@/shared/assets';

import { Table } from './ui';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'Customers',
};

interface CustomersProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export const Customers = async (props: CustomersProps) => {
  const searchParams = await props.searchParams;

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await queryCustomersPages(query);

  return (
    <main className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <p>search bar</p>
        <p>add customer</p>
      </div>
      <Table query={query} currentPage={currentPage} />
      <p>
        Pagination [{currentPage}] of {totalPages}
      </p>
    </main>
  );
};
