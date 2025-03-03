import { CSVLink } from 'react-csv';
import { Button } from '@/components/ui/button';
import { CiExport } from 'react-icons/ci';
import { useEffect } from 'react';
import { format } from 'date-fns';

type Transaction = {
  amount: number;
  id: string;
  date: string;
  category: string | null;
  categoryId: string | null;
  payee: string;
  notes: string | null;
  account: string;
  accountId: string;
};

type ExportButtonProps = {
  data: Transaction[];
};

export const ExportButton = ({ data }: ExportButtonProps) => {
  const formattedData = data
    .filter((item) => item.amount !== 0)
    .map(({ amount, date, category, payee, notes, account }) => ({
      amount,
      date: format(date, 'yyyy-MM-dd'),
      category,
      payee,
      notes,
      account,
    }));

  return (
    <Button size="sm" className="w-full lg:w-auto">
      <CSVLink className="flex items-center " data={formattedData}>
        <CiExport className="size-4 mr-2" />
        Export
      </CSVLink>
    </Button>
  );
};
