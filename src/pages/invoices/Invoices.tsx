import { Metadata } from 'next';

import { queryInvoicesPages } from '@/entites/invoice';

import { Pagination } from '@/features/pagination';
import { SearchBar } from '@/features/search-bar';

import { lusitana } from '@/shared/assets';

import { CreateInvoiceButton, Table } from './ui';

export const metadata: Metadata = {
  title: 'Invoices',
  description: 'Invoices',
};

interface InvoicesPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export const Invoices = async (props: InvoicesPageProps) => {
  const searchParams = await props.searchParams;

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await queryInvoicesPages(query);

  return (
    <main className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchBar placeholder="Search invoices..." />
        <CreateInvoiceButton />
      </div>
      <Table query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </main>
  );
};
