import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account';
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account';

type Props = {
  id: string;
};

export const ActionsAccounts = ({ id }: Props) => {
  const deleteAccountMutation = useDeleteAccount(id);
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this account?'
  );
  const { onOpen } = useOpenAccount();
  const disabled = deleteAccountMutation.isPending;
  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteAccountMutation.mutate();
    }
  };

  return (
    <div className="">
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={disabled} onClick={() => onOpen(id)}>
            <Edit className=" size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={disabled} onClick={handleDelete}>
            <Trash className="size-8  mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
