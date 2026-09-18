import Link from "next/link";
import { getBooks } from "@/lib/books";
import { BookGrid } from "@/components/books/BookGrid";

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Boeken</h1>
        <Link
          href="/books/new"
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
        >
          + Boek toevoegen
        </Link>
      </div>

      <BookGrid books={books} />
    </div>
  );
}
