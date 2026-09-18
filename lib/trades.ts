"use server";

import { and, asc, eq, gte, lt } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { trades, type NewTrade } from "./db/schema";
import { tradeFormSchema, type TradeFormValues } from "./validation";
import { calculateRR } from "./rr";

export async function getLiveTradesInRange(start: Date, end: Date) {
  return db
    .select()
    .from(trades)
    .where(
      and(
        eq(trades.type, "live"),
        gte(trades.tradedAt, start),
        lt(trades.tradedAt, end),
      ),
    )
    .orderBy(asc(trades.tradedAt));
}

export async function getAllLiveTrades() {
  return db
    .select()
    .from(trades)
    .where(eq(trades.type, "live"))
    .orderBy(asc(trades.tradedAt));
}

export async function getTradesForDay(day: Date) {
  const start = new Date(day);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return db
    .select()
    .from(trades)
    .where(
      and(
        eq(trades.type, "live"),
        gte(trades.tradedAt, start),
        lt(trades.tradedAt, end),
      ),
    )
    .orderBy(asc(trades.tradedAt));
}

function toNewTrade(values: TradeFormValues): NewTrade {
  const rr =
    values.rr ??
    calculateRR(
      values.direction,
      values.entry,
      values.stopLoss ?? null,
      values.takeProfit ?? null,
    );

  return {
    type: values.type,
    backtestSessionId: values.backtestSessionId ?? null,
    pair: values.pair,
    direction: values.direction,
    entry: values.entry,
    stopLoss: values.stopLoss ?? null,
    takeProfit: values.takeProfit ?? null,
    exitPrice: values.exitPrice ?? null,
    rr: rr ?? null,
    outcome: values.outcome ?? null,
    tradedAt: values.tradedAt,
    session: values.session ?? null,
    setupTag: values.setupTag ?? null,
    mistakeTags: values.mistakeTags ?? [],
    screenshotUrl: values.screenshotUrl || null,
    notes: values.notes ?? null,
    beforeNote: values.beforeNote ?? null,
    afterNote: values.afterNote ?? null,
  };
}

export async function createTrade(input: unknown) {
  const values = tradeFormSchema.parse(input);
  const [created] = await db
    .insert(trades)
    .values(toNewTrade(values))
    .returning();

  revalidatePath("/");
  revalidatePath("/trading");
  revalidatePath("/day/[date]", "page");
  return created;
}

export async function updateTrade(id: string, input: unknown) {
  const values = tradeFormSchema.parse(input);
  const [updated] = await db
    .update(trades)
    .set({ ...toNewTrade(values), updatedAt: new Date() })
    .where(eq(trades.id, id))
    .returning();

  revalidatePath("/");
  revalidatePath("/trading");
  revalidatePath("/day/[date]", "page");
  return updated;
}

export async function deleteTrade(id: string) {
  await db.delete(trades).where(eq(trades.id, id));
  revalidatePath("/");
  revalidatePath("/trading");
  revalidatePath("/day/[date]", "page");
}
