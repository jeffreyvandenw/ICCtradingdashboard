"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createBook, lookupBookByIsbn, updateBook } from "@/lib/books";
import type { Book } from "@/lib/db/schema";

export function BookForm({ book }: { book?: Book }) {
  const router = useRouter();
  const [isbn, setIsbn] = useState(book?.isbn ?? "");
  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [coverUrl, setCoverUrl] = useState(book?.coverUrl ?? "");
  const [pageCount, setPageCount] = useState(
    book?.pageCount ? String(book.pageCount) : "",
  );
  const [status, setStatus] = useState<Book["status"]>(
    book?.status ?? "to_read",
  );
  const [rating, setRating] = useState(book?.rating ? String(book.rating) : "");
  const [notes, setNotes] = useState(book?.notes ?? "");
  const [looking, setLooking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLookup() {
    if (!isbn.trim()) return;
    setLooking(true);
    setError(null);
    try {
      const result = await lookupBookByIsbn(isbn);
      if (!result) {
        setError("Geen boek gevonden voor dit ISBN.");
        return;
      }
      if (result.title) setTitle(result.title);
      if (result.author) setAuthor(result.author);
      if (result.coverUrl) setCoverUrl(result.coverUrl);
      if (result.pageCount) setPageCount(String(result.pageCount));
    } catch {
      setError("Opzoeken via Open Library is mislukt.");
    } finally {
      setLooking(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      isbn,
      title,
      author,
      coverUrl,
      pageCount: pageCount ? Number(pageCount) : null,
      status,
      rating: rating ? Number(rating) : null,
      notes,
      startedAt: book?.startedAt ?? null,
      finishedAt: book?.finishedAt ?? null,
    };

    try {
      if (book) {
        await updateBook(book.id, payload);
      } else {
        await createBook(payload);
      }
      router.push("/books");
      router.refresh();
    } catch {
      setError("Opslaan is mislukt. Controleer de invoer.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">
          ISBN
        </label>
        <div className="flex gap-2">
          <input
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="978..."
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={handleLookup}
            disabled={looking || !isbn.trim()}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            {looking ? "Opzoeken..." : "Opzoeken"}
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Haalt titel, auteur, cover en paginacount op via Open Library.
        </p>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">
          Titel
        </label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Auteur
          </label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Pagina&apos;s
          </label>
          <input
            type="number"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Book["status"])}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="to_read">Te lezen</option>
            <option value="reading">Bezig</option>
            <option value="read">Gelezen</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Rating (1-5)
          </label>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">
          Cover URL
        </label>
        <input
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">
          Notities
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {submitting ? "Opslaan..." : "Opslaan"}
      </button>
    </form>
  );
}
