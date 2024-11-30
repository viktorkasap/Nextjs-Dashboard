import { getInvoicesPages } from '@/entites/invoice';
import { Pagination } from '@/pages/invoices/ui/pagination';
import { lusitana } from '@/shared/assets';

import { SearchBar, CreateInvoiceButton, Table, DeleteInvoice, UpdateInvoice, StatusInvoice } from './ui';

interface InvoicesPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: number;
  }>;
}

export const Invoices = async (props: InvoicesPageProps) => {
  const searchParams = await props.searchParams;

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getInvoicesPages(query);

  return (
    <main className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchBar placeholder="Search invoices..." />
        <CreateInvoiceButton />
      </div>
      <Table
        query={query}
        currentPage={currentPage}
        DeleteInvoice={DeleteInvoice}
        UpdateInvoice={UpdateInvoice}
        StatusInvoice={StatusInvoice}
      />
      <Pagination totalPages={totalPages} />
    </main>
  );
};
