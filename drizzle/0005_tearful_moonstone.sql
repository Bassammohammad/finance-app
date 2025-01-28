ALTER TABLE "plaidToken" RENAME TO "plaidTransactions";--> statement-breakpoint
ALTER TABLE "plaidTransactions" ADD COLUMN "account_id" text;--> statement-breakpoint
ALTER TABLE "plaidTransactions" ADD COLUMN "amount" text;--> statement-breakpoint
ALTER TABLE "plaidTransactions" ADD COLUMN "date" timestamp;--> statement-breakpoint
ALTER TABLE "plaidTransactions" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "plaidTransactions" ADD COLUMN "category" text;--> statement-breakpoint
ALTER TABLE "plaidTransactions" DROP COLUMN IF EXISTS "accessToken";