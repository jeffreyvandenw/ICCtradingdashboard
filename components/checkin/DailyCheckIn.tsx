"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createTodayCheckIn } from "@/lib/checkins";
import { cn } from "@/lib/utils";
import type { CheckIn } from "@/lib/db/schema";

function YesNoToggle({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={cn(
          "rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
          value === true
            ? "bg-emerald-600 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200",
        )}
      >
        Ja
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={cn(
          "rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
          value === false
            ? "bg-rose-600 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200",
        )}
      >
        Nee
      </button>
    </div>
  );
}

export function DailyCheckIn({
  todayCheckIn,
  streak,
}: {
  todayCheckIn: CheckIn | null;
  streak: number;
}) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState(todayCheckIn);
  const [didYesterday, setDidYesterday] = useState<boolean | null>(null);
  const [confidentToday, setConfidentToday] = useState<boolean | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (didYesterday === null || confidentToday === null) return;

    setSubmitting(true);
    setError(null);
    try {
      const created = await createTodayCheckIn({
        didYesterday,
        confidentToday,
        notes,
      });
      setCheckIn(created);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Opslaan van check-in mislukt.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit = didYesterday !== null && confidentToday !== null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">
          Dagelijkse check-in
        </h2>
        {streak > 0 && (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
            🔥 {streak} dag{streak === 1 ? "" : "en"} op rij
          </span>
        )}
      </div>

      {checkIn ? (
        <div className="space-y-2 text-sm">
          <p className="text-slate-600">
            Vandaag al ingecheckt ✅
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <span>
              Gisteren gedaan wat je zei: {" "}
              <span className="font-medium text-slate-700">
                {checkIn.didYesterday ? "Ja" : "Nee"}
              </span>
            </span>
            <span>
              Vertrouwen voor vandaag: {" "}
              <span className="font-medium text-slate-700">
                {checkIn.confidentToday ? "Ja" : "Nee"}
              </span>
            </span>
          </div>
          {checkIn.notes && (
            <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
              {checkIn.notes}
            </p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          )}

          <div>
            <p className="mb-1.5 text-sm text-slate-700">
              Heb je gisteren gedaan wat je zei dat je ging doen?
            </p>
            <YesNoToggle value={didYesterday} onChange={setDidYesterday} />
          </div>

          <div>
            <p className="mb-1.5 text-sm text-slate-700">
              Heb je er vertrouwen in dat je vandaag gaat doen wat je moet
              doen?
            </p>
            <YesNoToggle
              value={confidentToday}
              onChange={setConfidentToday}
            />
          </div>

          <div>
            <p className="mb-1.5 text-sm text-slate-700">
              Is er nog iets wat je kwijt wilt?
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Optioneel..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Opslaan..." : "Check-in opslaan"}
          </button>
        </form>
      )}
    </div>
  );
}
