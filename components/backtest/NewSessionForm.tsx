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
  // Every session starts with a fresh balance; nothing carries over.
  const [balance, setBalance] = useState("");
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
        startingBalance: balance ? Number(balance) : null,
      });
      router.push(`/backtest/${created.id}`);
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Aanmaken mislukt");
    }
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-neutral-300 px-2 py-1.5 text-sm focus:border-gold-400 focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl border border-neutral-200 bg-surface p-4 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="block text-xs font-medium text-neutral-600 sm:col-span-3">
          Hypothese — wat test ik in deze sessie?
          <textarea
            required
            rows={2}
            className={inputClass}
            value={hypothesis}
            onChange={(e) => setHypothesis(e.target.value)}
          />
        </label>
        <label className="block text-xs font-medium text-neutral-600">
          Startbedrag (€)
          <input
            type="number"
            min="0"
            step="any"
            className={inputClass}
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="bijv. 10000"
          />
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-gold-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gold-500 disabled:opacity-50"
      >
        {submitting ? "Aanmaken..." : "Nieuwe sessie starten"}
      </button>
    </form>
  );
}
