'use client';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

import { transactions as transactionSchema } from '@/db/schema';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { UploadButton } from '@/features/transactions/components/upload-button';
import { ImportCard } from '@/features/transactions/components/import-card';

import { DataTable } from '@/components/data-table';

import { columns } from '@/app/(dashboard)/transactions/columns';

import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions';
import { useBulkCreateTransactions } from '@/features/transactions/api/use-bulk-create-transactions';
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction';
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions';
import { useSelectAccount } from '@/features/accounts/components/use-select-account';

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}
const INITIAL_IMPORT_RESULT = {
  data: [],
  errors: [],
  meta: {},
};

export default function TransactionsPage() {
  const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULT);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULT) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };
  const onCancelImport = () => {
    setVariant(VARIANTS.LIST);
    setImportResults(INITIAL_IMPORT_RESULT);
  };

  const transactionsQuery = useGetTransactions();
  const transactions = transactionsQuery.data || [];
  const createTransactions = useBulkCreateTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const newTransaction = useNewTransaction();

  const isDisabled =
    transactionsQuery.isLoading || deleteTransactions.isPending;

  const onSubmitImport = async (
    values: (typeof transactionSchema.$inferInsert)[]
  ) => {
    const accountId = await confirm();
    if (!accountId) {
      return toast.error('Please select an account to continue');
    }
    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));
    createTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if (transactionsQuery.isLoading) {
    return (
      <div className="  max-w-screen-2xl mx-auto -mt-24 w-full pb-10  ">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48 rounded-md" />
          </CardHeader>
          <CardContent className="h-[500px] w-full flex items-center justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }

  return (
    <div className="mx-2 md:mx-18 lg:mx-20">
      <div className="  max-w-screen-2xl mx-auto -mt-24 w-full pb-10  ">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:justify-between lg:items-center  ">
            <CardTitle className="text-xl line-clamp-1">
              Transactions History
            </CardTitle>
            <div className="flex flex-col lg:flex-row items-center gap-x-2 gap-y-2">
              <Button
                size="sm"
                onClick={newTransaction.onOpen}
                className="w-full lg:w-auto"
              >
                <Plus className="size-4 " />
                add transaction
              </Button>
              <UploadButton onUpload={onUpload} />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={transactions}
              columns={columns}
              filterKey="date"
              disabled={isDisabled}
              onDelete={(row) => {
                const ids = row.map((r) => r.original.id);
                deleteTransactions.mutate({ ids });
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
