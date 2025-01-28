import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const config = new Configuration({
  basePath: PlaidEnvironments.sandbox, // Utilisez `production` pour prod
  baseOptions: {
    headers: {
      PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID || '',
      PLAID_SECRET: process.env.PLAID_SECRET || '',
    },
  },
});

export const plaidClient = new PlaidApi(config);
