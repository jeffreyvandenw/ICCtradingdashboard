"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createTodayCheckIn } from "@/lib/checkins";
import { cn } from "@/lib/utils";
import type { CheckIn } from "@/lib/db/schema";
import {
  CheckInAnswers,
  CONFIDENT_TOMORROW_QUESTION,
  DID_AS_PROMISED_QUESTION,
} from "./CheckInAnswers";

const textareaClass =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-400 focus:outline-none";

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

function Question({
  question,
  value,
  onChange,
  note,
  onNoteChange,
  notePlaceholder,
}: {
  question: string;
  value: boolean | null;
  onChange: (value: boolean) => void;
  note: string;
  onNoteChange: (value: string) => void;
  notePlaceholder: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-slate-700">{question}</p>
      <YesNoToggle value={value} onChange={onChange} />
      {value === false && (
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          rows={2}
          required
          placeholder={notePlaceholder}
          className={textareaClass}
        />
      )}
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
  const [didAsPromised, setDidAsPromised] = useState<boolean | null>(null);
  const [didAsPromisedNote, setDidAsPromisedNote] = useState("");
  const [confidentTomorrow, setConfidentTomorrow] = useState<boolean | null>(
    null,
  );
  const [confidentTomorrowNote, setConfidentTomorrowNote] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (didAsPromised === null || confidentTomorrow === null) return;

    setSubmitting(true);
    setError(null);
    try {
      const created = await createTodayCheckIn({
        didAsPromised,
        didAsPromisedNote,
        confidentTomorrow,
        confidentTomorrowNote,
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

  const canSubmit =
    didAsPromised !== null &&
    confidentTomorrow !== null &&
    (didAsPromised || didAsPromisedNote.trim() !== "") &&
    (confidentTomorrow || confidentTomorrowNote.trim() !== "");

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-surface p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
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
        <div className="space-y-3">
          <p className="text-sm text-slate-500">Vandaag al ingecheckt ✅</p>
          <CheckInAnswers checkIn={checkIn} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          )}

          <Question
            question={DID_AS_PROMISED_QUESTION}
            value={didAsPromised}
            onChange={setDidAsPromised}
            note={didAsPromisedNote}
            onNoteChange={setDidAsPromisedNote}
            notePlaceholder="Wat heb je niet gedaan, en waarom niet?"
          />

          <Question
            question={CONFIDENT_TOMORROW_QUESTION}
            value={confidentTomorrow}
            onChange={setConfidentTomorrow}
            note={confidentTomorrowNote}
            onNoteChange={setConfidentTomorrowNote}
            notePlaceholder="Waarom niet? Wat houdt je tegen?"
          />

          <div className="space-y-2">
            <p className="text-sm text-slate-700">
              Is er nog iets wat je kwijt wilt?
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Optioneel..."
              className={textareaClass}
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="rounded-lg bg-gold-600 px-4 py-2 text-sm font-medium text-white hover:bg-gold-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Opslaan..." : "Check-in opslaan"}
          </button>
        </form>
      )}
    </div>
  );
}
