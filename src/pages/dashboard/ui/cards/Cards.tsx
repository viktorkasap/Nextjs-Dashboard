import { Suspense } from 'react';

import { queryCardsData } from '@/entites/cards';
import { CardSkeleton } from '@/shared/ui';
import { Card } from '@/widgets/cards';

export const Cards = () => {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <CardsView />
    </Suspense>
  );
};

const CardsView = async () => {
  const cardsData = await queryCardsData();

  return (
    <>
      <Card title="Collected" value={cardsData.totalPaidInvoices} type="collected" />
      <Card title="Pending" value={cardsData.totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={cardsData.numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={cardsData.numberOfCustomers} type="customers" />
    </>
  );
};
