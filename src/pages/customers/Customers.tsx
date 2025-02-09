import { Metadata } from 'next';

import { queryCustomersPages } from '@/entites/customer';

import { Pagination } from '@/features/pagination';
import { SearchBar } from '@/features/search-bar';

import { lusitana } from '@/shared/assets';

import { Table, CreateCustomerButton } from './ui';

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
        <SearchBar placeholder="Search customer..." />
        <CreateCustomerButton />
      </div>
      <Table query={query} currentPage={currentPage} />

      <Pagination totalPages={totalPages} />
    </main>
  );
};
