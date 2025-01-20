import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
type ResponseType = InferResponseType<
  (typeof client.api.accounts)[':id']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)[':id']['$patch']
>['json'];

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient();
  const editMutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      if (!id) {
        throw new Error('Account ID is required');
      }

      const response = await client.api.accounts[':id']['$patch']({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Account created successfully');
      queryClient.invalidateQueries({ queryKey: ['account', { id }] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error('Error editing account');
    },
  });
  return editMutation;
};
