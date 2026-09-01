"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { createTrade } from "@/lib/trades";

interface RowState {
  key: string;
  pair: string;
  direction: "long" | "short";
  entry: string;
  stopLoss: string;
  takeProfit: string;
  exitPrice: string;
  rr: string;
  outcome: "win" | "loss" | "breakeven" | "";
  screenshotUrl: string;
  notes: string;
  beforeNote: string;
  afterNote: string;
  saving: boolean;
  error: string | null;
}

function blankRow(key: string): RowState {
  return {
    key,
    pair: "",
    direction: "long",
    entry: "",
    stopLoss: "",
    takeProfit: "",
    exitPrice: "",
    rr: "",
    outcome: "",
    screenshotUrl: "",
    notes: "",
    beforeNote: "",
    afterNote: "",
    saving: false,
    error: null,
  };
}

export function BacktestRowGrid({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const baseId = useId();
  const [nextKey, setNextKey] = useState(1);
  const [rows, setRows] = useState<RowState[]>([blankRow(`${baseId}-0`)]);

  function addRow() {
    setRows((prev) => [...prev, blankRow(`${baseId}-${nextKey}`)]);
    setNextKey((n) => n + 1);
  }

  function removeRow(key: string) {
    setRows((prev) => {
      const next = prev.filter((r) => r.key !== key);
      return next.length > 0 ? next : [blankRow(`${baseId}-${nextKey}`)];
    });
  }

  function updateRow(key: string, patch: Partial<RowState>) {
    setRows((prev) =>
      prev.map((r) => (r.key === key ? { ...r, ...patch } : r)),
    );
  }

  async function saveRow(row: RowState) {
    updateRow(row.key, { saving: true, error: null });

    try {
      await createTrade({
        type: "backtest",
        backtestSessionId: sessionId,
        pair: row.pair,
        direction: row.direction,
        entry: Number(row.entry),
        stopLoss: row.stopLoss ? Number(row.stopLoss) : null,
        takeProfit: row.takeProfit ? Number(row.takeProfit) : null,
        exitPrice: row.exitPrice ? Number(row.exitPrice) : null,
        rr: row.rr ? Number(row.rr) : null,
        outcome: row.outcome || null,
        tradedAt: new Date(),
        session: null,
        setupTag: null,
        mistakeTags: [],
        screenshotUrl: row.screenshotUrl || null,
        notes: row.notes || null,
        beforeNote: row.beforeNote || null,
        afterNote: row.afterNote || null,
      });

      setRows((prev) => {
        const remaining = prev.filter((r) => r.key !== row.key);
        return remaining.length > 0
          ? remaining
          : [blankRow(`${baseId}-${nextKey}`)];
      });
      setNextKey((n) => n + 1);
      router.refresh();
    } catch (err) {
      updateRow(row.key, {
        saving: false,
        error: err instanceof Error ? err.message : "Opslaan mislukt",
      });
    }
  }

  const inputClass =
    "w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-800";
  const labelClass =
    "block text-xs font-medium text-neutral-600 dark:text-neutral-400";

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div
          key={row.key}
          className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            <label className={labelClass}>
              Pair
              <input
                className={inputClass}
                value={row.pair}
                onChange={(e) => updateRow(row.key, { pair: e.target.value })}
              />
            </label>
            <label className={labelClass}>
              Richting
              <select
                className={inputClass}
                value={row.direction}
                onChange={(e) =>
                  updateRow(row.key, {
                    direction: e.target.value as "long" | "short",
                  })
                }
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
                value={row.entry}
                onChange={(e) => updateRow(row.key, { entry: e.target.value })}
              />
            </label>
            <label className={labelClass}>
              Stop loss
              <input
                type="number"
                step="any"
                className={inputClass}
                value={row.stopLoss}
                onChange={(e) =>
                  updateRow(row.key, { stopLoss: e.target.value })
                }
              />
            </label>
            <label className={labelClass}>
              Take profit
              <input
                type="number"
                step="any"
                className={inputClass}
                value={row.takeProfit}
                onChange={(e) =>
                  updateRow(row.key, { takeProfit: e.target.value })
                }
              />
            </label>
            <label className={labelClass}>
              Exit
              <input
                type="number"
                step="any"
                className={inputClass}
                value={row.exitPrice}
                onChange={(e) =>
                  updateRow(row.key, { exitPrice: e.target.value })
                }
              />
            </label>
            <label className={labelClass}>
              RR (auto, overschrijfbaar)
              <input
                type="number"
                step="any"
                placeholder="auto"
                className={inputClass}
                value={row.rr}
                onChange={(e) => updateRow(row.key, { rr: e.target.value })}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <label className={labelClass}>
              Uitkomst
              <select
                className={inputClass}
                value={row.outcome}
                onChange={(e) =>
                  updateRow(row.key, {
                    outcome: e.target.value as RowState["outcome"],
                  })
                }
              >
                <option value="">—</option>
                <option value="win">Win</option>
                <option value="loss">Loss</option>
                <option value="breakeven">Breakeven</option>
              </select>
            </label>
            <label className={`${labelClass} sm:col-span-3`}>
              Screenshot (Google Drive link)
              <input
                className={inputClass}
                value={row.screenshotUrl}
                onChange={(e) =>
                  updateRow(row.key, { screenshotUrl: e.target.value })
                }
              />
            </label>
            <label className={`${labelClass} col-span-2 sm:col-span-4`}>
              Opmerkingen
              <textarea
                rows={2}
                className={inputClass}
                value={row.notes}
                onChange={(e) => updateRow(row.key, { notes: e.target.value })}
              />
            </label>
            <label className={`${labelClass} col-span-2`}>
              Before-notitie
              <textarea
                rows={2}
                className={inputClass}
                value={row.beforeNote}
                onChange={(e) =>
                  updateRow(row.key, { beforeNote: e.target.value })
                }
              />
            </label>
            <label className={`${labelClass} col-span-2`}>
              After-notitie
              <textarea
                rows={2}
                className={inputClass}
                value={row.afterNote}
                onChange={(e) =>
                  updateRow(row.key, { afterNote: e.target.value })
                }
              />
            </label>
          </div>

          {row.error && <p className="text-sm text-red-600">{row.error}</p>}

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={row.saving || !row.pair || !row.entry}
              onClick={() => saveRow(row)}
              className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
            >
              {row.saving ? "Opslaan..." : "Rij opslaan"}
            </button>
            {rows.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(row.key)}
                className="text-xs text-neutral-500 hover:underline"
              >
                Rij verwijderen
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="rounded-md border border-dashed border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
      >
        + Nieuwe rij
      </button>
    </div>
  );
}
