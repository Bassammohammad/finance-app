CREATE TABLE IF NOT EXISTS "plaidTransactions" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"amount" numeric NOT NULL,
	"date" timestamp NOT NULL,
	"name" text NOT NULL,
	"category" text
);
