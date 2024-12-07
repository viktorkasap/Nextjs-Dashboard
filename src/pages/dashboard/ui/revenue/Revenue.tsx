import { Suspense } from 'react';

import { queryRevenue } from '@/entites/revenue';
import { RevenueChartSkeleton } from '@/shared/ui';
import { RevenueChart } from '@/widgets/revenue-chart';

export const Revenue = async () => {
  return (
    <Suspense fallback={<RevenueChartSkeleton />}>
      <RevenueChartView />
    </Suspense>
  );
};

const RevenueChartView = async () => {
  const revenue = await queryRevenue();

  return <RevenueChart revenue={revenue} />;
};
