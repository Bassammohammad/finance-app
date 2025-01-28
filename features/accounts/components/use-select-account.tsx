import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useCreateAccount } from '@/features/accounts/api/use-create-account';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { Select } from '@/components/select';

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>,
] => {
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  const accountsOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);
  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });
  const selectValue = useRef<string>();
  const handleClose = () => {
    setPromise(null);
  };
  const handleConfirm = () => {
    promise?.resolve(selectValue.current);
    handleClose();
  };
  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };
  const AccountDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Please select an account to continue
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Select account"
          options={accountsOptions}
          onCreate={onCreateAccount}
          onChange={(value) => (selectValue.current = value)}
          disabled={accountQuery.isLoading || accountMutation.isPending}
        />
        <DialogFooter>
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  return [AccountDialog, confirm];
};
