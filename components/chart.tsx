'use Client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, BarChart, FileSearch, LineChart } from 'lucide-react';
import { AreaVariant } from '@/components/area-variant';
import { BarVariant } from '@/components/bar-variant';
import { LineVariant } from '@/components/line-variant';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const Chart = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState('area');
  const onChartChange = (type: string) => {
    setChartType(type);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
        <Select defaultValue={chartType} onValueChange={onChartChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart type " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Area chart</p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Bar chart</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Line chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-neutral-500" />{' '}
            <p className="text-neutral-500 text-sm">
              {' '}
              No data available for this period
            </p>
          </div>
        ) : (
          <>
            {chartType === 'area' && <AreaVariant data={data} />}
            {chartType === 'bar' && <BarVariant data={data} />}
            {chartType === 'line' && <LineVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const DataChartLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm h-[192px]">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className=" h-[100px] w-auto " />
      </CardContent>
    </Card>
  );
};
