import { z } from 'zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { insertTransactionsSchema } from '@/db/schema';
import { Select } from '@/components/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AmountInput } from '@/components/amount-input';
import { convertAmountToMiliunits } from '@/lib/utils';

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string().max(2000000000),
  notes: z.string().nullable().optional(),
});
const apiSchema = insertTransactionsSchema.omit({
  id: true,
});
type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
  id?: string;
  defaultValue?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  categoryOptions: { label: string; value: string }[];
  accountOptions: { label: string; value: string }[];
  onCreateCategory?: (name: string) => void;
  onCreateAccount?: (name: string) => void;
};
export const TransactionForm = ({
  id,
  defaultValue,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  onCreateAccount,
  categoryOptions,
  onCreateCategory,
}: Props) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });

  const handleSubmit = (values: FormValues) => {
    const amount = parseFloat(values.amount);
    const amountMiliunits = convertAmountToMiliunits(amount);
    onSubmit({
      ...values,
      amount: amountMiliunits,
    });
    console.log(values.date);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select an account"
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select a category"
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Add a payee"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput
                  {...field}
                  disabled={disabled}
                  placeholder="0.00 "
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ''}
                  disabled={disabled}
                  placeholder="Optional notes"
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
