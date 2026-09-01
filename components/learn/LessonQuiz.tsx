"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { markLessonProgress } from "@/lib/lessons";
import type { LessonQuiz as LessonQuizType } from "@/lib/db/schema";

export function LessonQuiz({
  lessonId,
  quiz,
  initialScore,
}: {
  lessonId: string;
  quiz: LessonQuizType;
  initialScore: number | null;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(initialScore);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    setSubmitting(true);
    const correct = quiz.questions.filter(
      (q, i) => answers[i] === q.correctIndex,
    ).length;
    const pct = Math.round((correct / quiz.questions.length) * 100);
    setScore(pct);
    await markLessonProgress(lessonId, { completed: true, quizScore: pct });
    setSubmitting(false);
    router.refresh();
  }

  const allAnswered = quiz.questions.every((_, i) => answers[i] != null);

  return (
    <div className="space-y-4 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
        Quiz
      </p>
      {quiz.questions.map((q, qIndex) => (
        <div key={qIndex} className="space-y-1">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {qIndex + 1}. {q.question}
          </p>
          <div className="space-y-1 pl-2">
            {q.options.map((option, oIndex) => (
              <label
                key={oIndex}
                className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
              >
                <input
                  type="radio"
                  name={`quiz-${qIndex}`}
                  checked={answers[qIndex] === oIndex}
                  onChange={() =>
                    setAnswers((prev) => ({ ...prev, [qIndex]: oIndex }))
                  }
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!allAnswered || submitting}
        className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
      >
        {submitting ? "Controleren..." : "Quiz controleren"}
      </button>

      {score != null && (
        <p className="text-sm font-medium text-emerald-600">
          Score: {score}%
        </p>
      )}
    </div>
  );
}
