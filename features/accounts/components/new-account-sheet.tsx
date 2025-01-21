import { z } from 'zod';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useNewAccounts } from '@/features/accounts/hooks/use-new-accounts';
import { AccountForm } from '@/features/accounts/components/account-form';
import { insertAccountsSchema } from '@/db/schema';
import { useCreateAccount } from '@/features/accounts/api/use-create-account';

const formSchema = insertAccountsSchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;
export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccounts();
  const accountMutation = useCreateAccount();

  const onSubmit = (values: FormValues) => {
    accountMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="  space-y-4 ">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create an account to be able to make transactions
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={false}
          defaultValue={{
            name: '',
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
