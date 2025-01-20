'use client';

import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';
// HOOKS//
export const useGetAccount = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['account', id],
    queryFn: async () => {
      if (!id) throw new Error('No accounts found.');

      const response = await client.api.accounts[':id'].$get({
        param: { id: id },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch accounts.');
      }
      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
