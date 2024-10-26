import { getCardsData } from '@/entites/cards';
import { getLatestInvoices } from '@/entites/invoice';
import { getRevenue } from '@/entites/revenue';
import { lusitana } from '@/shared/assets';
import { Card } from '@/widgets/cards';
import { LatestInvoices } from '@/widgets/latest-invoices';
import { RevenueChart } from '@/widgets/revenue-chart';

export const Dashboard = async () => {
  const revenue = await getRevenue(); // ? Invoke into RevenueChart
  const latestInvoices = await getLatestInvoices(); // ? Invoke into LatestInvoices
  const cardsData = await getCardsData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={cardsData.totalPaidInvoices} type="collected" />
        <Card title="Pending" value={cardsData.totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={cardsData.numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={cardsData.numberOfCustomers} type="customers" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} /> {/* TODO: ?move to pages/dashboard/ui */}
        <LatestInvoices latestInvoices={latestInvoices} /> {/* TODO: ?move to pages/dashboard/ui */}
      </div>
    </main>
  );
};
