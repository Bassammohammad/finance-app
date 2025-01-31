'use client';

import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { useSearchParams } from 'next/navigation';
import { convertAmountFromMiliunits } from '@/lib/utils';
// HOOKS//
export const useGetTransactions = () => {
  const params = useSearchParams();
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const page = params.get('page') || '1';
  const accountId = params.get('accountId') || '';
  const query = useQuery({
    queryKey: ['transactions', { from, to, accountId, page }],

    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: {
          from,
          to,
          accountId,
          page: page,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions.');
      }
      const { data, totalRecords, perPage } = await response.json();

      return {
        data: data.map((transaction) => ({
          ...transaction,
          amount: convertAmountFromMiliunits(transaction.amount),
        })),
        totalRecords,
        perPage,
      };
    },
  });
  return query;
};
