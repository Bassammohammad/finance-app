import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import { useDeleteCategory } from '@/features/categories/api/use-delete-category';
import { useOpenCategory } from '@/features/categories/hooks/use-open-category';

type Props = {
  id: string;
};

export const ActionsCategories = ({ id }: Props) => {
  const deleteCategoryMutation = useDeleteCategory(id);
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this account?'
  );
  const { onOpen } = useOpenCategory();

  const disabled = deleteCategoryMutation.isPending;
  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteCategoryMutation.mutate();
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
