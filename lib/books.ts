"use server";

import { asc, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { books } from "./db/schema";
import { bookFormSchema } from "./validation";

export async function getBooks() {
  return db.select().from(books).orderBy(desc(books.createdAt));
}

export async function getCurrentlyReading(limit?: number) {
  const rows = await db
    .select()
    .from(books)
    .where(eq(books.status, "reading"))
    .orderBy(asc(books.startedAt));
  return limit ? rows.slice(0, limit) : rows;
}

export async function getBook(id: string) {
  const [book] = await db.select().from(books).where(eq(books.id, id));
  return book;
}

function toBookValues(values: ReturnType<typeof bookFormSchema.parse>) {
  return {
    isbn: values.isbn || null,
    title: values.title,
    author: values.author || null,
    coverUrl: values.coverUrl || null,
    pageCount: values.pageCount ?? null,
    status: values.status,
    rating: values.rating ?? null,
    notes: values.notes || null,
    startedAt: values.startedAt ?? null,
    finishedAt: values.finishedAt ?? null,
  };
}

export async function createBook(input: unknown) {
  const values = bookFormSchema.parse(input);
  const [created] = await db
    .insert(books)
    .values(toBookValues(values))
    .returning();

  revalidatePath("/books");
  revalidatePath("/");
  return created;
}

export async function updateBook(id: string, input: unknown) {
  const values = bookFormSchema.parse(input);
  const [updated] = await db
    .update(books)
    .set(toBookValues(values))
    .where(eq(books.id, id))
    .returning();

  revalidatePath("/books");
  revalidatePath("/");
  return updated;
}

export async function deleteBook(id: string) {
  await db.delete(books).where(eq(books.id, id));
  revalidatePath("/books");
  revalidatePath("/");
}

export interface BookLookupResult {
  title: string | null;
  author: string | null;
  coverUrl: string | null;
  pageCount: number | null;
}

/**
 * Looks up book metadata by ISBN via the free Open Library API — no API key
 * or self-hosted book database needed.
 */
export async function lookupBookByIsbn(
  rawIsbn: string,
): Promise<BookLookupResult | null> {
  const isbn = rawIsbn.replace(/[^0-9Xx]/g, "");
  if (!isbn) return null;

  const url = `https://openlibrary.org/api/books?bibkeys=${encodeURIComponent(
    `ISBN:${isbn}`,
  )}&jscmd=data&format=json`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;

  const data = (await res.json()) as Record<
    string,
    {
      title?: string;
      authors?: { name: string }[];
      number_of_pages?: number;
      cover?: { large?: string; medium?: string; small?: string };
    }
  >;

  const entry = data[`ISBN:${isbn}`];
  if (!entry) return null;

  return {
    title: entry.title ?? null,
    author: entry.authors?.map((a) => a.name).join(", ") ?? null,
    coverUrl:
      entry.cover?.large ?? entry.cover?.medium ?? entry.cover?.small ?? null,
    pageCount: entry.number_of_pages ?? null,
  };
}
