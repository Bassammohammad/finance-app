import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';

import { Separator } from '@/components/ui/separator';

export const CustomTooltip = ({ active, payload }: any) => {
  if (!active) return null;

  const date = payload[0].payload.date;
  const income = payload[0].value;
  const expenses = payload[1].value;
  return (
    <div className="rounded-md bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-neutral-200 text-neutral-500">
        {format(date, 'MMM dd, yyyy')}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-center gap-x-4">
          <div className="flex items-center justify-center gap-x-2">
            <div className="size-1.5 bg-blue-500 rounded-full" />
            <p className="text-sm text-neutral-500">Income</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(income)}
          </p>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <div className="flex items-center justify-center gap-x-2">
            <div className="size-1.5 bg-rose-500 rounded-full" />
            <p className="text-sm text-neutral-500">Expenses</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(expenses * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};
