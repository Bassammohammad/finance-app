import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHeader,
  TableHead,
} from '@/components/ui/table';
import { TableHeadSelect } from '@/features/transactions/components/table-head-select';

type Props = {
  header: string[];
  body: string[][];
  selectedColumns: Record<string, string | null>;
  onTableHeadSelectChange: (columnIndex: number, value: string | null) => void;
};

export const ImportTable = ({
  header,
  body,
  onTableHeadSelectChange,
  selectedColumns,
}: Props) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {header.map((_header, index) => (
              <TableHead key={index}>
                <TableHeadSelect
                  columnIndex={index}
                  selectedColumns={selectedColumns}
                  onChange={onTableHeadSelectChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row, index) => (
            <TableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
