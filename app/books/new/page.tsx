import { BookForm } from "@/components/books/BookForm";

export default function NewBookPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6 px-6 py-6">
      <h1 className="text-xl font-semibold text-slate-900">Boek toevoegen</h1>
      <BookForm />
    </div>
  );
}
