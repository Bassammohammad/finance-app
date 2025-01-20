import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
type ResponseType = InferResponseType<
  (typeof client.api.categories)[':id']['$delete']
>;

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      if (!id) {
        throw new Error('Category ID is required');
      }

      const response = await client.api.categories[':id']['$delete']({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Category deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['category', { id }] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['translations'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error('Error deleting account');
    },
  });
  return deleteMutation;
};
