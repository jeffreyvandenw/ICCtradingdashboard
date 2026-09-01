"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { markLessonProgress } from "@/lib/lessons";

export function MarkCompleteButton({
  lessonId,
  completed,
}: {
  lessonId: string;
  completed: boolean;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function toggle() {
    setSaving(true);
    await markLessonProgress(lessonId, {
      completed: !completed,
      quizScore: null,
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={saving}
      className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-200"
    >
      {completed ? "Markeer als niet afgerond" : "Markeer als afgerond"}
    </button>
  );
}
