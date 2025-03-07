import { toast } from 'sonner';
import { InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
type ResponseType = InferResponseType<
  (typeof client.api.transactions)[':id']['$delete']
>;

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      if (!id) {
        throw new Error('Transaction ID is required');
      }

      const response = await client.api.transactions[':id']['$delete']({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Transaction deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['transaction', { id }] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error('Error deleting transaction');
    },
  });
  return deleteMutation;
};
