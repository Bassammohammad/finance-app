import { z } from 'zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { insertAccountsSchema } from '@/db/schema';

const formSchema = insertAccountsSchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValue?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};
export const AccountForm = ({
  id,
  defaultValue,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  required
                  placeholder="e.g. Cach, Credit Card, Bank"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className=" w-full " disabled={disabled}>
          {id ? 'Save changes' : 'Create account'}
        </Button>
        {!!id && (
          <Button
            type="button"
            className=" w-full"
            disabled={disabled}
            onClick={onDelete}
            variant="outline"
          >
            <Trash />
            Delete account
          </Button>
        )}
      </form>
    </Form>
  );
};
