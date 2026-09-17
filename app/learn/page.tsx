import Link from "next/link";
import { getLessons } from "@/lib/lessons";
import { groupLessonsByModule } from "@/lib/learn-modules";
import { ModuleList } from "@/components/learn/ModuleList";

export default async function LearnPage() {
  const lessons = await getLessons();
  const modules = groupLessonsByModule(lessons);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900">
          Leren — ICC lesprogramma
        </h1>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/learn/glossary"
            className="text-sky-600 hover:underline"
          >
            Begrippenlijst
          </Link>
          <Link
            href="/learn/new"
            className="rounded-md border border-neutral-300 px-3 py-1.5 font-medium text-neutral-700 hover:bg-neutral-100"
          >
            + Les toevoegen
          </Link>
        </div>
      </div>

      {modules.length > 0 ? (
        <ModuleList modules={modules} />
      ) : (
        <p className="text-sm text-neutral-400">Nog geen lessen toegevoegd.</p>
      )}
    </div>
  );
}
