'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { Skeleton } from '@/components/ui/skeleton';

import { Plus, Loader2 } from 'lucide-react';

import { columns } from '@/app/(dashboard)/categories/columns';

import { useGetCategories } from '@/features/categories/api/use-get-categories';
import { useBulkDeleteCategory } from '@/features/categories/api/use-bulk-delete-categories';
import { useNewCategory } from '@/features/categories/hooks/use-new-category';

export default function AccountsPage() {
  const accountQuery = useGetCategories();
  const accounts = accountQuery.data || [];
  const deleteAccounts = useBulkDeleteCategory();
  const newAccount = useNewCategory();

  const isDisabled = accountQuery.isLoading || deleteAccounts.isPending;

  if (accountQuery.isLoading) {
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

  return (
    <div className="mx-20">
      <div className="  max-w-screen-2xl mx-auto -mt-24 w-full pb-10  ">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:justify-between lg:items-center  ">
            <CardTitle className="text-xl line-clamp-1">
              Categories Page
            </CardTitle>
            <Button onClick={newAccount.onOpen}>
              <Plus className="size-4 " />
              add category
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              data={accounts}
              columns={columns}
              filterKey="name"
              disabled={isDisabled}
              onDelete={(row) => {
                const ids = row.map((r) => r.original.id);
                deleteAccounts.mutate({ ids });
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
