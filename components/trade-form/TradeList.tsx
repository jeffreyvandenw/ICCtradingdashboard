"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { deleteTrade } from "@/lib/trades";
import type { Trade } from "@/lib/db/schema";

const OUTCOME_LABEL: Record<string, string> = {
  win: "Win",
  loss: "Loss",
  breakeven: "Breakeven",
};

export function TradeList({ trades }: { trades: Trade[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (trades.length === 0) {
    return (
      <p className="text-sm text-neutral-400">
        Nog geen trades gelogd op deze dag.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {trades.map((trade) => (
        <li
          key={trade.id}
          className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 text-sm dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div>
            <p className="font-medium text-neutral-900 dark:text-neutral-100">
              {trade.pair} &middot; {trade.direction === "long" ? "Long" : "Short"}
              {trade.outcome && ` · ${OUTCOME_LABEL[trade.outcome]}`}
            </p>
            <p className="text-xs text-neutral-500">
              {format(trade.tradedAt, "HH:mm")} &middot; entry {trade.entry}
              {trade.exitPrice != null && ` → exit ${trade.exitPrice}`}
              {trade.rr != null && ` · RR ${trade.rr.toFixed(2)}`}
            </p>
          </div>
          <button
            type="button"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                await deleteTrade(trade.id);
                router.refresh();
              })
            }
            className="text-xs text-red-600 hover:underline disabled:opacity-50"
          >
            Verwijderen
          </button>
        </li>
      ))}
    </ul>
  );
}
