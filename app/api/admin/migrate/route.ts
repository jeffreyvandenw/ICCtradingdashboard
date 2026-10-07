import { sql } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/lib/db";

/**
 * Applies the columns from migration 0005 for when `npm run db:migrate`
 * can't be run against the production database. Every statement is
 * idempotent, so opening this URL twice (or after db:migrate) is harmless.
 */
const STATEMENTS = [
  sql`ALTER TABLE "backtest_sessions" ADD COLUMN IF NOT EXISTS "starting_balance" double precision`,
  sql`ALTER TABLE "check_ins" ADD COLUMN IF NOT EXISTS "did_as_promised_note" text`,
  sql`ALTER TABLE "check_ins" ADD COLUMN IF NOT EXISTS "confident_tomorrow_note" text`,
  sql`ALTER TABLE "trades" ADD COLUMN IF NOT EXISTS "pnl" double precision`,
];

export async function GET() {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized — log eerst in op de site.", {
      status: 401,
    });
  }

  for (const statement of STATEMENTS) {
    await db.execute(statement);
  }

  return new Response(
    "Database bijgewerkt (migratie 0005).\n\nGa naar / om het dashboard te bekijken.",
  );
}
