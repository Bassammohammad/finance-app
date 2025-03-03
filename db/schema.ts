import { z } from 'zod';
import {
  pgTable,
  text,
  integer,
  timestamp,
  numeric,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { relations } from 'drizzle-orm';
export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  plaid_id: text('plaid_id'),
  name: text('name').notNull(),
  userId: text('userId').notNull(),
});

export const accountsRelations = relations(accounts, ({ many }) => ({
  transactions: many(transactions),
}));
export const insertAccountsSchema = createInsertSchema(accounts);

export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  plaid_id: text('plaid_id'),
  name: text('name').notNull(),
  userId: text('userId').notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));

export const insertCategoriesSchema = createInsertSchema(categories);

export const transactions = pgTable('transactions', {
  id: text('id').primaryKey(),
  amount: integer('amount').notNull(),
  payee: text('payee').notNull(),
  notes: text('notes'),
  date: timestamp('date', { mode: 'date' }).notNull(),
  accountId: text('account_id')
    .references(() => accounts.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  categoryId: text('category').references(() => categories.id, {
    onDelete: 'set null',
  }),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  accounts: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id],
  }),
  categories: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

export const insertTransactionsSchema = createInsertSchema(transactions, {
  date: z.coerce.date(),
});

export const plaidTransactions = pgTable('plaid_transactions', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  amount: numeric('amount').notNull(),
  date: timestamp('date').notNull(),
  name: text('name').notNull(),
  category: text('category'),
});

export const insertPlaidTransactionsSchema = createInsertSchema(
  plaidTransactions,
  {
    date: z.coerce.date(),
  }
);
