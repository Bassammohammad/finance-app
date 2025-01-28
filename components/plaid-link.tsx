import { usePlaidLink } from 'react-plaid-link';

export default function PlaidLink({
  linkToken,
  onSuccess,
}: {
  linkToken: string;
  onSuccess: (publicToken: string) => void;
}) {
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (publicToken) => onSuccess(publicToken),
    onExit: (error) => {
      if (error) console.error(error);
    },
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Connect to Plaid
    </button>
  );
}
