'use client';

import qs from 'query-string';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useGetSummary } from '@/features/summary/use-get-summary';

export const AccountFilter = () => {
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();
  const { isLoading: isLoadingSummary } = useGetSummary();

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const accountId = params.get('accountId') || 'all';
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };
    if (newValue === 'all') {
      query.accountId = '';
    }
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger
        className="lg:w-auto w-full rounded-md px-3 font-normal bg-white/10
      hover:bg-white/20 hover:text-white border-none
      focus:ring-offset-0 focus:ring-transparent outline-none
       text-white focus:bg-white/30 transition"
      >
        <SelectValue placeholder={'Account'} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectItem value="all">All accounts</SelectItem>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
