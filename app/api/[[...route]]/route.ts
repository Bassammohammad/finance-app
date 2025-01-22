import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import accounts from './accounts';
import categories from './categories';
import transactions from './transactions';
import summary from './summary';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

// Middleware to handle CORS
app.use('*', async (c, next) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  c.res.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  c.res.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  await next();

  // Handle preflight requests (OPTIONS)
  if (c.req.method === 'OPTIONS') {
    c.status(204); // No content
  }
});

const routes = app
  .route('/accounts', accounts)
  .route('/summary', summary)
  .route('/categories', categories)
  .route('/transactions', transactions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
