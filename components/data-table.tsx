'use client';
import * as React from 'react';

import qs from 'query-string';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useConfirm } from '@/hooks/use-confirm';

import {
  Row,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalRecords?: number;
  totalPages?: number;
  perPage?: number;
  filterKey: string;
  disabled?: boolean;
  onDelete: (rows: Row<TData>[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalRecords,
  totalPages,
  perPage,
  filterKey,
  disabled,
  onDelete,
}: DataTableProps<TData, TValue>) {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    ' You are about to perform a bulk delete.'
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: perPage || 10,
      },
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const accountId = params.get('accountId') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const page = parseInt(params.get('page') ?? '1', 10);

  const onPageChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newValue: number
  ) => {
    e.preventDefault();
    const query = {
      accountId,
      from,
      to,
      page: newValue.toString(),
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url, { scroll: false });
  };

  return (
    <div>
      <ConfirmDialog />
      <div className="flex flex-col lg:flex-row items-center py-4 justify-between gap-x-2 gap-y-2">
        <Input
          placeholder={`Filter ${filterKey}...`}
          value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            table.getColumn(filterKey)?.setFilterValue(event.target.value);
          }}
          className="w-full lg:max-w-sm "
        />
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button
            disabled={disabled}
            onClick={async () => {
              const ok = await confirm();
              if (ok) {
                onDelete(table.getFilteredSelectedRowModel().rows);
                table.resetRowSelection();
              }
            }}
            className="w-full lg:w-auto"
          >
            <Trash />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={cn(index === 0 ? 'px-4' : 'px-0')}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="px-4" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground space-y-1">
          <p className="text-neutral-500">
            Page: {page}/{Math.ceil((totalRecords || 1 / 10) / (perPage || 10))}
          </p>
          <p className="text-neutral-500">{totalRecords} rows available</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => onPageChange(e, 1)}
          disabled={page === totalPages}
        >
          1
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => onPageChange(e, page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => onPageChange(e, page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
