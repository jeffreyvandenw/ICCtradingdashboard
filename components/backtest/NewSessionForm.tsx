"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createBacktestSession } from "@/lib/backtest";

export function NewSessionForm({
  defaultHypothesis,
  lessonId,
}: {
  defaultHypothesis?: string;
  lessonId?: string;
}) {
  const router = useRouter();
  const [hypothesis, setHypothesis] = useState(defaultHypothesis ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const created = await createBacktestSession({
        hypothesis,
        lessonId: lessonId ?? null,
      });
      router.push(`/backtest/${created.id}`);
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Aanmaken mislukt");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4"
    >
      <label className="block text-xs font-medium text-neutral-600">
        Hypothese — wat test ik in deze sessie?
        <textarea
          required
          rows={2}
          className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
          value={hypothesis}
          onChange={(e) => setHypothesis(e.target.value)}
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
      >
        {submitting ? "Aanmaken..." : "Nieuwe sessie starten"}
      </button>
    </form>
  );
}
