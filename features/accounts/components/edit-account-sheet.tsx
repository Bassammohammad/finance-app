import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account';
import { AccountForm } from '@/features/accounts/components/account-form';
import { insertAccountsSchema } from '@/db/schema';
import { useGetAccount } from '@/features/accounts/api/use-get-account';
import { useEditAccount } from '@/features/accounts/api/use-edit-account';
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account';
import { useConfirm } from '@/hooks/use-confirm';
const formSchema = insertAccountsSchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;
export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure ?',
    'You are about to delete this account?'
  );
  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteAccountMutation = useDeleteAccount(id);
  const isPending = editMutation.isPending || deleteAccountMutation.isPending;
  const isLoading = accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteAccountMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValue = accountQuery.data
    ? { name: accountQuery.data.name }
    : { name: ' ' };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="  space-y-4 ">
          <SheetHeader>
            <SheetTitle>Update Account</SheetTitle>
            <SheetDescription>Update your account name</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin  " />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isPending}
              defaultValue={defaultValue}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
