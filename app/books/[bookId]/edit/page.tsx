import { notFound } from "next/navigation";
import { getBook } from "@/lib/books";
import { BookForm } from "@/components/books/BookForm";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const book = await getBook(bookId);
  if (!book) notFound();

  return (
    <div className="mx-auto max-w-lg space-y-6 px-6 py-6">
      <h1 className="text-xl font-semibold text-slate-900">Boek bewerken</h1>
      <BookForm book={book} />
    </div>
  );
}
