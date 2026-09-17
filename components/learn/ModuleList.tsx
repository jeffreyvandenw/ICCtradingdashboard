"use client";

import { useState } from "react";
import Link from "next/link";
import type { LessonModule } from "@/lib/learn-modules";

export function ModuleList({ modules }: { modules: LessonModule[] }) {
  const [openKey, setOpenKey] = useState<string | null>(modules[0]?.key ?? null);

  return (
    <div className="space-y-3">
      {modules.map((module) => {
        const completedCount = module.lessons.filter((l) => l.completed).length;
        const progress =
          module.lessons.length > 0
            ? (completedCount / module.lessons.length) * 100
            : 0;
        const isOpen = openKey === module.key;

        return (
          <div
            key={module.key}
            className="rounded-lg border border-neutral-200 bg-white"
          >
            <button
              type="button"
              onClick={() => setOpenKey(isOpen ? null : module.key)}
              className="flex w-full items-center justify-between gap-4 p-3 text-left"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-neutral-900">
                  {module.label}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {module.lessons.length} les
                  {module.lessons.length === 1 ? "" : "sen"} ·{" "}
                  {completedCount}/{module.lessons.length} voltooid
                </p>
                <div className="mt-1.5 h-1 w-32 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <span className="shrink-0 text-lg text-neutral-400">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen && (
              <ol className="space-y-2 border-t border-neutral-100 p-3">
                {module.lessons.map((lesson, index) => (
                  <li key={lesson.id}>
                    <Link
                      href={`/learn/${lesson.id}`}
                      className="flex items-center justify-between gap-3 rounded-md border border-neutral-200 p-3 text-sm hover:bg-neutral-50"
                    >
                      <span className="font-medium text-neutral-900">
                        {index + 1}. {lesson.title}
                      </span>
                      <span className="flex shrink-0 items-center gap-2 text-xs text-neutral-500">
                        {lesson.quizScore != null && `Score: ${lesson.quizScore}%`}
                        {lesson.completed ? (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-800">
                            Afgerond
                          </span>
                        ) : (
                          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-neutral-500">
                            Nog niet afgerond
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </div>
        );
      })}
    </div>
  );
}
