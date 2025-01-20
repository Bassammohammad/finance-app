import { format } from 'date-fns';
import {
  Tooltip,
  XAxis,
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { CustomTooltip } from '@/components/custom-tooltip';

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const BarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="hover:bg-black" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, 'dd MMM')}
          style={{ fontSize: '12px' }}
          tickMargin={16}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: '#D4D4D4', opacity: 0.5 }}
        />
        <Bar dataKey="income" fill="#3d82f6" className="drop-shadow-sm " />
        <Bar dataKey="expenses" fill="#f43f5e" className="drop-shadow-sm" />
      </BarChart>
    </ResponsiveContainer>
  );
};
