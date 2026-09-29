"use server";

import { and, asc, desc, eq, gt, isNotNull, max, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { groceryItems, shops } from "./db/schema";
import { groceryItemFormSchema, shopFormSchema } from "./validation";

// How long a checked-off item stays visible (struck through) on the list.
const CHECKED_VISIBLE_MS = 30 * 60 * 1000;

function revalidate() {
  revalidatePath("/boodschappen");
  revalidatePath("/");
}

export async function getShops() {
  return db.select().from(shops).orderBy(asc(shops.sortOrder), asc(shops.name));
}

export async function getGroceryItems() {
  const cutoff = new Date(Date.now() - CHECKED_VISIBLE_MS);
  return db
    .select()
    .from(groceryItems)
    .where(
      or(eq(groceryItems.done, false), gt(groceryItems.checkedAt, cutoff)),
    )
    .orderBy(asc(groceryItems.createdAt));
}

export async function getOpenGroceryItems() {
  return db
    .select({
      id: groceryItems.id,
      name: groceryItems.name,
      shopName: shops.name,
    })
    .from(groceryItems)
    .leftJoin(shops, eq(groceryItems.shopId, shops.id))
    .where(eq(groceryItems.done, false))
    .orderBy(asc(groceryItems.createdAt));
}

// Previously bought items, most recent first, with the shop they were last
// bought at — used to suggest names (and prefill the shop) while typing.
export async function getGrocerySuggestions() {
  const rows = await db
    .select({
      name: groceryItems.name,
      shopId: groceryItems.shopId,
    })
    .from(groceryItems)
    .orderBy(desc(groceryItems.createdAt))
    .limit(500);

  const seen = new Map<string, { name: string; shopId: string | null }>();
  for (const row of rows) {
    const key = row.name.toLowerCase();
    if (!seen.has(key)) seen.set(key, { name: row.name, shopId: row.shopId });
  }
  return [...seen.values()];
}

export async function createGroceryItem(input: unknown) {
  const values = groceryItemFormSchema.parse(input);
  const [created] = await db
    .insert(groceryItems)
    .values({
      name: values.name,
      quantity: values.quantity,
      unit: values.unit || null,
      note: values.note || null,
      shopId: values.shopId ?? null,
    })
    .returning();

  revalidate();
  return created;
}

export async function toggleGroceryItem(id: string, done: boolean) {
  const [updated] = await db
    .update(groceryItems)
    .set({ done, checkedAt: done ? new Date() : null })
    .where(eq(groceryItems.id, id))
    .returning();
  revalidate();
  return updated;
}

export async function deleteGroceryItem(id: string) {
  await db.delete(groceryItems).where(eq(groceryItems.id, id));
  revalidate();
}

// Hides all checked items right away instead of waiting for the 30 minutes.
export async function clearCheckedGroceryItems() {
  const past = new Date(Date.now() - CHECKED_VISIBLE_MS - 1000);
  await db
    .update(groceryItems)
    .set({ checkedAt: past })
    .where(
      and(eq(groceryItems.done, true), isNotNull(groceryItems.checkedAt)),
    );
  revalidate();
}

export async function createShop(input: unknown) {
  const { name } = shopFormSchema.parse(input);

  const [existing] = await db
    .select()
    .from(shops)
    .where(sql`lower(${shops.name}) = lower(${name})`);
  if (existing) return existing;

  const [{ maxOrder }] = await db
    .select({ maxOrder: max(shops.sortOrder) })
    .from(shops);
  const [created] = await db
    .insert(shops)
    .values({ name, sortOrder: (maxOrder ?? 0) + 1 })
    .returning();

  revalidate();
  return created;
}
