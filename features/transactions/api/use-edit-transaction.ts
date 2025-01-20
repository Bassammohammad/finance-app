import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import {
  convertAmountFromMiliunits,
  convertAmountToMiliunits,
} from '@/lib/utils';
type ResponseType = InferResponseType<
  (typeof client.api.transactions)[':id']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)[':id']['$patch']
>['json'];

export const useEditTransaction = (id?: string) => {
  const queryClient = useQueryClient();
  const editMutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      if (!id) {
        throw new Error('Transaction ID is required');
      }

      const response = await client.api.transactions[':id']['$patch']({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Transaction updated successfully');
      queryClient.invalidateQueries({ queryKey: ['transaction', { id }] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error('Error editing transaction');
    },
  });
  return editMutation;
};
