import { lusitana } from '@/shared/assets';

import { Revenue, Invoices, Cards } from './ui';

export const Dashboard = async () => {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Cards />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Revenue />
        <Invoices />
      </div>
    </main>
  );
};
