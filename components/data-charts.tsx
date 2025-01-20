'use client';

import { useGetSummary } from '@/features/summary/use-get-summary';
import { Chart, DataChartLoading } from '@/components/chart';
import { DataSpendingPieLoading, SpendingPie } from '@/components/spending-pie';

export const DataCharts = () => {
  const { data, isLoading } = useGetSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 pb-2 mb-8 ">
        <div className="col-span-1 lg:col-span-4 ">
          <DataChartLoading />
        </div>
        <div className="col-span-1 lg:col-span-2 ">
          <DataSpendingPieLoading />
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 pb-2 mb-8 ">
      <div className="col-span-1 lg:col-span-4 ">
        <Chart data={data?.days} />
      </div>
      <div className="col-span-1 lg:col-span-2 ">
        <SpendingPie data={data?.categories} />
      </div>
    </div>
  );
};
