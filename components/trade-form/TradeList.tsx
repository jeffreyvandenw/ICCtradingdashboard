"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { deleteTrade } from "@/lib/trades";
import type { Trade } from "@/lib/db/schema";
import { ScreenshotPreview } from "@/components/ScreenshotPreview";

const OUTCOME_LABEL: Record<string, string> = {
  win: "Win",
  loss: "Loss",
  breakeven: "Breakeven",
};

interface TradeListProps {
  trades: Trade[];
  showTime?: boolean;
  readOnly?: boolean;
  emptyLabel?: string;
}

export function TradeList({
  trades,
  showTime = true,
  readOnly = false,
  emptyLabel = "Nog geen trades gelogd.",
}: TradeListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (trades.length === 0) {
    return <p className="text-sm text-neutral-400">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-2">
      {trades.map((trade) => (
        <li
          key={trade.id}
          className="rounded-lg border border-neutral-200 bg-white p-3 text-sm dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                {trade.pair} &middot;{" "}
                {trade.direction === "long" ? "Long" : "Short"}
                {trade.outcome && ` · ${OUTCOME_LABEL[trade.outcome]}`}
              </p>
              <p className="text-xs text-neutral-500">
                {showTime && `${format(trade.tradedAt, "HH:mm")} · `}
                entry {trade.entry}
                {trade.exitPrice != null && ` → exit ${trade.exitPrice}`}
                {trade.rr != null && ` · RR ${trade.rr.toFixed(2)}`}
              </p>
              {(trade.beforeNote || trade.afterNote || trade.notes) && (
                <p className="mt-1 text-xs text-neutral-400">
                  {trade.beforeNote && <>Before: {trade.beforeNote} </>}
                  {trade.afterNote && <>After: {trade.afterNote} </>}
                  {trade.notes && <>{trade.notes}</>}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {trade.screenshotUrl && (
                <button
                  type="button"
                  onClick={() =>
                    setExpandedId((id) => (id === trade.id ? null : trade.id))
                  }
                  className="text-xs text-sky-600 hover:underline"
                >
                  {expandedId === trade.id ? "Verberg screenshot" : "Screenshot"}
                </button>
              )}
              {!readOnly && (
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
              )}
            </div>
          </div>
          {expandedId === trade.id && trade.screenshotUrl && (
            <div className="mt-2">
              <ScreenshotPreview url={trade.screenshotUrl} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
