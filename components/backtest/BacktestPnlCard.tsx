"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBacktestSessionBalance } from "@/lib/backtest";
import { BACKTEST_RISK_PCT, computeBacktestPnl } from "@/lib/backtest-pnl";
import { formatMoney, formatMoneyCompact } from "@/lib/money";
import { cn } from "@/lib/utils";
import type { Trade } from "@/lib/db/schema";
import { CurveChart } from "@/components/stats/CurveChart";

export function BacktestPnlCard({
  sessionId,
  startingBalance,
  trades,
}: {
  sessionId: string;
  startingBalance: number | null;
  trades: Pick<Trade, "outcome" | "rr">[];
}) {
  const router = useRouter();
  const [balance, setBalance] = useState(
    startingBalance != null ? String(startingBalance) : "",
  );
  const [saving, setSaving] = useState(false);

  const value = Number(balance);
  const pnl = balance && value > 0 ? computeBacktestPnl(trades, value) : null;
  const dirty = (startingBalance ?? null) !== (balance ? value : null);

  async function save() {
    setSaving(true);
    await updateBacktestSessionBalance(sessionId, balance ? value : null);
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-surface p-4 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            P&amp;L curve · {BACKTEST_RISK_PCT}% risico per trade
          </p>
          {pnl && (
            <p
              className={cn(
                "mt-1 text-2xl font-light",
                pnl.pnl > 0 && "text-emerald-600",
                pnl.pnl < 0 && "text-rose-600",
                pnl.pnl === 0 && "text-slate-900",
              )}
            >
              {formatMoney(pnl.pnl, { signed: true })}
              <span className="ml-2 text-sm text-slate-500">
                ({pnl.returnPct > 0 ? "+" : ""}
                {pnl.returnPct.toFixed(1)}%) · eindsaldo{" "}
                {formatMoney(pnl.endBalance)}
              </span>
            </p>
          )}
        </div>
        <div className="flex items-end gap-2">
          <label className="block text-xs font-medium text-slate-500">
            Startbedrag (€)
            <input
              type="number"
              min="0"
              step="any"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="bijv. 10000"
              className="mt-1 w-32 rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:border-gold-400 focus:outline-none"
            />
          </label>
          {dirty && (
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-lg bg-gold-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gold-500 disabled:opacity-50"
            >
              {saving ? "Opslaan..." : "Opslaan"}
            </button>
          )}
        </div>
      </div>

      {pnl ? (
        <CurveChart
          data={pnl.curve}
          formatValue={(v) => formatMoney(v)}
          formatTick={formatMoneyCompact}
          seriesName="Saldo"
          baseline={value}
          emptyLabel=""
        />
      ) : (
        <p className="py-8 text-center text-sm text-slate-400">
          Vul een startbedrag in om de P&amp;L curve te zien.
        </p>
      )}
    </div>
  );
}
