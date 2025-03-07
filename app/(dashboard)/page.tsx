'use client';
import { DataGrid } from '@/components/data-grid';
import { DataCharts } from '@/components/data-charts';

export default function Dashboard() {
  return (
    <div className=" mx-2 md:mx-14 lg:mx-14">
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 ">
        <DataGrid />
        <DataCharts />
      </div>
    </div>
  );
}
