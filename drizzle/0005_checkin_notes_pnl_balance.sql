ALTER TABLE "backtest_sessions" ADD COLUMN IF NOT EXISTS "starting_balance" double precision;--> statement-breakpoint
ALTER TABLE "check_ins" ADD COLUMN IF NOT EXISTS "did_as_promised_note" text;--> statement-breakpoint
ALTER TABLE "check_ins" ADD COLUMN IF NOT EXISTS "confident_tomorrow_note" text;--> statement-breakpoint
ALTER TABLE "trades" ADD COLUMN IF NOT EXISTS "pnl" double precision;