import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { CategoryForm } from '@/features/categories/components/category-form';
import { insertCategoriesSchema } from '@/db/schema';

import { useConfirm } from '@/hooks/use-confirm';
import { useGetCategory } from '@/features/categories/api/use-get-category';
import { useEditCategory } from '@/features/categories/api/use-edit-category';
import { useDeleteCategory } from '@/features/categories/api/use-delete-category';
import { useOpenCategory } from '@/features/categories/hooks/use-open-category';
const formSchema = insertCategoriesSchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;
export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure ?',
    'You are about to delete this category?'
  );
  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteCategoryMutation = useDeleteCategory(id);
  const isPending = editMutation.isPending || deleteCategoryMutation.isPending;
  const isLoading = categoryQuery.isLoading;

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
      deleteCategoryMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValue = categoryQuery.data
    ? { name: categoryQuery.data.name }
    : { name: ' ' };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className=" bg-white space-y-4 ">
          <SheetHeader>
            <SheetTitle>Update Category</SheetTitle>
            <SheetDescription>Update your category name</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin  " />
            </div>
          ) : (
            <CategoryForm
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
