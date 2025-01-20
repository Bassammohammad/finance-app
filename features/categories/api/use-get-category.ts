'use client';

import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';
// HOOKS//
export const useGetCategory = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['category', id],
    queryFn: async () => {
      if (!id) throw new Error('No category found.');

      const response = await client.api.categories[':id'].$get({
        param: { id: id },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories.');
      }
      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
