"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteBook } from "@/lib/books";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/db/schema";

const STATUS_LABEL: Record<Book["status"], string> = {
  to_read: "Te lezen",
  reading: "Bezig",
  read: "Gelezen",
};

const STATUS_CLASSES: Record<Book["status"], string> = {
  to_read: "bg-slate-100 text-slate-600",
  reading: "bg-amber-100 text-amber-700",
  read: "bg-emerald-100 text-emerald-700",
};

export function BookGrid({ books }: { books: Book[] }) {
  const [items, setItems] = useState(books);
  const [, startTransition] = useTransition();

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((b) => b.id !== id));
    startTransition(() => {
      deleteBook(id);
    });
  }

  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-400 shadow-sm">
        Nog geen boeken toegevoegd.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((book) => (
        <div
          key={book.id}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <Link href={`/books/${book.id}/edit`} className="flex flex-1 flex-col">
            <div className="flex aspect-[2/3] items-center justify-center bg-slate-100">
              {book.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="px-2 text-center text-xs text-slate-400">
                  {book.title}
                </span>
              )}
            </div>
            <div className="space-y-1 p-3">
              <p className="truncate text-sm font-medium text-slate-900">
                {book.title}
              </p>
              {book.author && (
                <p className="truncate text-xs text-slate-500">
                  {book.author}
                </p>
              )}
              <span
                className={cn(
                  "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                  STATUS_CLASSES[book.status],
                )}
              >
                {STATUS_LABEL[book.status]}
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => handleDelete(book.id)}
            className="absolute right-2 top-2 hidden rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-slate-500 shadow hover:text-rose-600 group-hover:block"
          >
            Verwijder
          </button>
        </div>
      ))}
    </div>
  );
}
