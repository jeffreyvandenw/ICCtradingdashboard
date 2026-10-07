"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { backtestSessions, trades } from "./db/schema";

export async function getBacktestSessions() {
  return db
    .select()
    .from(backtestSessions)
    .orderBy(desc(backtestSessions.createdAt));
}

export async function getBacktestSession(id: string) {
  const [session] = await db
    .select()
    .from(backtestSessions)
    .where(eq(backtestSessions.id, id));
  return session;
}

export async function getTradesForSession(sessionId: string) {
  return db
    .select()
    .from(trades)
    .where(eq(trades.backtestSessionId, sessionId))
    .orderBy(trades.tradedAt);
}

/** The most recently created session is the only one open for new entries. */
export async function getLatestBacktestSessionId(): Promise<string | null> {
  const [latest] = await db
    .select({ id: backtestSessions.id })
    .from(backtestSessions)
    .orderBy(desc(backtestSessions.createdAt))
    .limit(1);
  return latest?.id ?? null;
}

function toBalance(value: number | null | undefined): number | null {
  return value != null && Number.isFinite(value) && value > 0 ? value : null;
}

export async function createBacktestSession(input: {
  hypothesis: string;
  lessonId?: string | null;
  startingBalance?: number | null;
}) {
  const [created] = await db
    .insert(backtestSessions)
    .values({
      hypothesis: input.hypothesis,
      lessonId: input.lessonId ?? null,
      startingBalance: toBalance(input.startingBalance),
    })
    .returning();

  revalidatePath("/backtest");
  return created;
}

export async function updateBacktestSessionSummary(
  id: string,
  summary: string,
) {
  await db
    .update(backtestSessions)
    .set({ summary })
    .where(eq(backtestSessions.id, id));

  revalidatePath("/backtest");
  revalidatePath("/backtest/[sessionId]", "page");
}

export async function updateBacktestSessionBalance(
  id: string,
  startingBalance: number | null,
) {
  await db
    .update(backtestSessions)
    .set({ startingBalance: toBalance(startingBalance) })
    .where(eq(backtestSessions.id, id));

  revalidatePath("/backtest");
  revalidatePath("/backtest/[sessionId]", "page");
}

/** Deletes a session; its trades go with it (on delete cascade). */
export async function deleteBacktestSession(id: string) {
  await db.delete(backtestSessions).where(eq(backtestSessions.id, id));
  revalidatePath("/backtest");
}
