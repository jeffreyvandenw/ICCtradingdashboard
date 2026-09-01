"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { createTrade } from "@/lib/trades";
import type { Trade } from "@/lib/db/schema";

interface TradeFormProps {
  type: "live" | "backtest";
  defaultDate?: Date;
  backtestSessionId?: string;
  onSaved?: (trade: Trade) => void;
}

function toDatetimeLocalValue(date: Date): string {
  return format(date, "yyyy-MM-dd'T'HH:mm");
}

export function TradeForm({
  type,
  defaultDate,
  backtestSessionId,
  onSaved,
}: TradeFormProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pair, setPair] = useState("");
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [entry, setEntry] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [outcome, setOutcome] = useState<"win" | "loss" | "breakeven" | "">("");
  const [tradedAt, setTradedAt] = useState(
    toDatetimeLocalValue(defaultDate ?? new Date()),
  );

  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [rr, setRr] = useState("");
  const [session, setSession] = useState<"london" | "ny" | "asia" | "">("");
  const [setupTag, setSetupTag] = useState("");
  const [mistakeTags, setMistakeTags] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [beforeNote, setBeforeNote] = useState("");
  const [afterNote, setAfterNote] = useState("");

  function resetForm() {
    setPair("");
    setDirection("long");
    setEntry("");
    setExitPrice("");
    setOutcome("");
    setTradedAt(toDatetimeLocalValue(defaultDate ?? new Date()));
    setStopLoss("");
    setTakeProfit("");
    setRr("");
    setSession("");
    setSetupTag("");
    setMistakeTags("");
    setScreenshotUrl("");
    setNotes("");
    setBeforeNote("");
    setAfterNote("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const created = await createTrade({
        type,
        backtestSessionId: backtestSessionId ?? null,
        pair,
        direction,
        entry: Number(entry),
        stopLoss: stopLoss ? Number(stopLoss) : null,
        takeProfit: takeProfit ? Number(takeProfit) : null,
        exitPrice: exitPrice ? Number(exitPrice) : null,
        rr: rr ? Number(rr) : null,
        outcome: outcome || null,
        tradedAt: new Date(tradedAt),
        session: session || null,
        setupTag: setupTag || null,
        mistakeTags: mistakeTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        screenshotUrl: screenshotUrl || null,
        notes: notes || null,
        beforeNote: beforeNote || null,
        afterNote: afterNote || null,
      });

      resetForm();
      onSaved?.(created);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Opslaan mislukt");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-800";
  const labelClass = "block text-xs font-medium text-neutral-600 dark:text-neutral-400";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className={labelClass}>
          Pair
          <input
            className={inputClass}
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            required
          />
        </label>
        <label className={labelClass}>
          Richting
          <select
            className={inputClass}
            value={direction}
            onChange={(e) => setDirection(e.target.value as "long" | "short")}
          >
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
        </label>
        <label className={labelClass}>
          Entry
          <input
            type="number"
            step="any"
            className={inputClass}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            required
          />
        </label>
        <label className={labelClass}>
          Exit
          <input
            type="number"
            step="any"
            className={inputClass}
            value={exitPrice}
            onChange={(e) => setExitPrice(e.target.value)}
          />
        </label>
        <label className={labelClass}>
          Uitkomst
          <select
            className={inputClass}
            value={outcome}
            onChange={(e) =>
              setOutcome(e.target.value as "win" | "loss" | "breakeven" | "")
            }
            required
          >
            <option value="">—</option>
            <option value="win">Win</option>
            <option value="loss">Loss</option>
            <option value="breakeven">Breakeven</option>
          </select>
        </label>
        <label className={labelClass}>
          Datum/tijd
          <input
            type="datetime-local"
            className={inputClass}
            value={tradedAt}
            onChange={(e) => setTradedAt(e.target.value)}
            required
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="text-xs font-medium text-neutral-500 underline underline-offset-2"
      >
        {expanded ? "Minder velden" : "Meer velden"}
      </button>

      {expanded && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <label className={labelClass}>
            Stop loss
            <input
              type="number"
              step="any"
              className={inputClass}
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Take profit
            <input
              type="number"
              step="any"
              className={inputClass}
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
            />
          </label>
          <label className={labelClass}>
            RR (auto, overschrijfbaar)
            <input
              type="number"
              step="any"
              className={inputClass}
              value={rr}
              onChange={(e) => setRr(e.target.value)}
              placeholder="auto"
            />
          </label>
          <label className={labelClass}>
            Sessie
            <select
              className={inputClass}
              value={session}
              onChange={(e) =>
                setSession(e.target.value as "london" | "ny" | "asia" | "")
              }
            >
              <option value="">—</option>
              <option value="london">London</option>
              <option value="ny">New York</option>
              <option value="asia">Asia</option>
            </select>
          </label>
          <label className={labelClass}>
            Setup-tag
            <input
              className={inputClass}
              value={setupTag}
              onChange={(e) => setSetupTag(e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Fouten-tags (komma-gescheiden)
            <input
              className={inputClass}
              value={mistakeTags}
              onChange={(e) => setMistakeTags(e.target.value)}
              placeholder="FOMO, SL verplaatst"
            />
          </label>
          <label className={labelClass}>
            Screenshot (Google Drive link)
            <input
              className={inputClass}
              value={screenshotUrl}
              onChange={(e) => setScreenshotUrl(e.target.value)}
            />
          </label>
          <label className={`${labelClass} col-span-2 sm:col-span-4`}>
            Notities
            <textarea
              className={inputClass}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </label>
          <label className={`${labelClass} col-span-2`}>
            Before-notitie
            <textarea
              className={inputClass}
              value={beforeNote}
              onChange={(e) => setBeforeNote(e.target.value)}
              rows={2}
            />
          </label>
          <label className={`${labelClass} col-span-2`}>
            After-notitie
            <textarea
              className={inputClass}
              value={afterNote}
              onChange={(e) => setAfterNote(e.target.value)}
              rows={2}
            />
          </label>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
      >
        {submitting ? "Opslaan..." : "Trade toevoegen"}
      </button>
    </form>
  );
}
