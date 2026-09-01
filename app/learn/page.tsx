import Link from "next/link";
import { getLessons } from "@/lib/lessons";

export default async function LearnPage() {
  const lessons = await getLessons();

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
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
            className="rounded-md border border-neutral-300 px-3 py-1.5 font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            + Les toevoegen
          </Link>
        </div>
      </div>

      <ol className="space-y-2">
        {lessons.map((lesson, index) => (
          <li key={lesson.id}>
            <Link
              href={`/learn/${lesson.id}`}
              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 text-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {index + 1}. {lesson.title}
              </span>
              <span className="flex items-center gap-2 text-xs text-neutral-500">
                {lesson.quizScore != null && `Score: ${lesson.quizScore}%`}
                {lesson.completed ? (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                    Afgerond
                  </span>
                ) : (
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-neutral-500 dark:bg-neutral-800">
                    Nog niet afgerond
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
        {lessons.length === 0 && (
          <p className="text-sm text-neutral-400">
            Nog geen lessen toegevoegd.
          </p>
        )}
      </ol>
    </div>
  );
}
