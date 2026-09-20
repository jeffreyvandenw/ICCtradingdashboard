"use server";

import { asc, desc, eq } from "drizzle-orm";
import { subDays } from "date-fns";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { checkIns } from "./db/schema";
import { checkInFormSchema } from "./validation";
import { dayKey } from "./date";

export async function getCheckIns() {
  return db.select().from(checkIns).orderBy(desc(checkIns.day));
}

export async function getTodayCheckIn() {
  const today = dayKey(new Date());
  const [row] = await db
    .select()
    .from(checkIns)
    .where(eq(checkIns.day, today));
  return row ?? null;
}

export async function getFirstCheckInDay(): Promise<string | null> {
  const [row] = await db
    .select({ day: checkIns.day })
    .from(checkIns)
    .orderBy(asc(checkIns.day))
    .limit(1);
  return row?.day ?? null;
}

export async function getCheckInStreak(): Promise<number> {
  const rows = await db.select({ day: checkIns.day }).from(checkIns);
  const days = new Set(rows.map((r) => r.day));

  const today = new Date();
  let cursor = days.has(dayKey(today)) ? today : subDays(today, 1);
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak++;
    cursor = subDays(cursor, 1);
  }
  return streak;
}

export async function createTodayCheckIn(input: unknown) {
  const values = checkInFormSchema.parse(input);
  const today = dayKey(new Date());

  const existing = await getTodayCheckIn();
  if (existing) {
    throw new Error("Je hebt vandaag al ingecheckt.");
  }

  const [created] = await db
    .insert(checkIns)
    .values({
      day: today,
      didYesterday: values.didYesterday,
      confidentToday: values.confidentToday,
      notes: values.notes || null,
    })
    .returning();

  revalidatePath("/");
  revalidatePath("/checkin");
  return created;
}
