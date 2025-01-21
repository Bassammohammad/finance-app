import { z } from 'zod';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { CategoryForm } from '@/features/categories/components/category-form';
import { insertCategoriesSchema } from '@/db/schema';
import { useCreateCategory } from '@/features/categories/api/use-create-category';
import { useNewCategory } from '@/features/categories/hooks/use-new-category';

const formSchema = insertCategoriesSchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;
export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();
  const categoryMutation = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    categoryMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="  space-y-4 ">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create an category to be able to make transactions
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
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
