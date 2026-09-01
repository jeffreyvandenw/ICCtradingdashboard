"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createLesson, updateLesson } from "@/lib/lessons";
import type { Lesson, LessonQuizQuestion } from "@/lib/db/schema";

interface LessonEditorProps {
  lesson?: Lesson;
}

function blankQuestion(): LessonQuizQuestion {
  return { question: "", options: ["", ""], correctIndex: 0 };
}

export function LessonEditor({ lesson }: LessonEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(lesson?.title ?? "");
  const [videoRef, setVideoRef] = useState(lesson?.videoRef ?? "");
  const [content, setContent] = useState(lesson?.content ?? "");
  const [suggestedHypothesis, setSuggestedHypothesis] = useState(
    lesson?.suggestedHypothesis ?? "",
  );
  const [order, setOrder] = useState(String(lesson?.order ?? 0));
  const [questions, setQuestions] = useState<LessonQuizQuestion[]>(
    lesson?.quiz?.questions ?? [],
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateQuestion(index: number, patch: Partial<LessonQuizQuestion>) {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, ...patch } : q)),
    );
  }

  function updateOption(qIndex: number, oIndex: number, value: string) {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((o, j) => (j === oIndex ? value : o)),
            }
          : q,
      ),
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const validQuestions = questions.filter(
      (q) => q.question.trim() && q.options.filter((o) => o.trim()).length >= 2,
    );

    const payload = {
      title,
      videoRef: videoRef || null,
      content: content || null,
      quiz: validQuestions.length > 0 ? { questions: validQuestions } : null,
      suggestedHypothesis: suggestedHypothesis || null,
      order: Number(order) || 0,
    };

    try {
      if (lesson) {
        await updateLesson(lesson.id, payload);
      } else {
        await createLesson(payload);
      }
      router.push("/learn");
      router.refresh();
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Opslaan mislukt");
    }
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-800";
  const labelClass =
    "block text-xs font-medium text-neutral-600 dark:text-neutral-400";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="grid grid-cols-2 gap-3">
        <label className={`${labelClass} col-span-2`}>
          Titel
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className={labelClass}>
          Video-referentie (link)
          <input
            className={inputClass}
            value={videoRef}
            onChange={(e) => setVideoRef(e.target.value)}
          />
        </label>
        <label className={labelClass}>
          Volgorde
          <input
            type="number"
            className={inputClass}
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
        </label>
        <label className={`${labelClass} col-span-2`}>
          Samenvatting / lesstof
          <textarea
            rows={6}
            className={inputClass}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <label className={`${labelClass} col-span-2`}>
          Suggestie voor backtest-hypothese
          <input
            className={inputClass}
            value={suggestedHypothesis}
            onChange={(e) => setSuggestedHypothesis(e.target.value)}
            placeholder="bv. Test ICC continuation na een correctie in de London-sessie"
          />
        </label>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Quizvragen
          </p>
          <button
            type="button"
            onClick={() => setQuestions((prev) => [...prev, blankQuestion()])}
            className="text-xs text-sky-600 hover:underline"
          >
            + Vraag toevoegen
          </button>
        </div>

        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="space-y-2 rounded-md border border-neutral-200 p-3 dark:border-neutral-800"
          >
            <div className="flex items-start gap-2">
              <input
                className={`${inputClass} mt-0 flex-1`}
                placeholder="Vraag"
                value={q.question}
                onChange={(e) =>
                  updateQuestion(qIndex, { question: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() =>
                  setQuestions((prev) => prev.filter((_, i) => i !== qIndex))
                }
                className="text-xs text-red-600 hover:underline"
              >
                Verwijderen
              </button>
            </div>
            {q.options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correctIndex === oIndex}
                  onChange={() =>
                    updateQuestion(qIndex, { correctIndex: oIndex })
                  }
                />
                <input
                  className={`${inputClass} mt-0 flex-1`}
                  placeholder={`Optie ${oIndex + 1}`}
                  value={option}
                  onChange={(e) =>
                    updateOption(qIndex, oIndex, e.target.value)
                  }
                />
                {q.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() =>
                      updateQuestion(qIndex, {
                        options: q.options.filter((_, i) => i !== oIndex),
                        correctIndex:
                          q.correctIndex >= oIndex && q.correctIndex > 0
                            ? q.correctIndex - 1
                            : q.correctIndex,
                      })
                    }
                    className="text-xs text-neutral-400 hover:text-red-600"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                updateQuestion(qIndex, { options: [...q.options, ""] })
              }
              className="text-xs text-neutral-500 hover:underline"
            >
              + Optie
            </button>
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
      >
        {submitting ? "Opslaan..." : "Les opslaan"}
      </button>
    </form>
  );
}
