import Link from "next/link";
import { format } from "date-fns";
import { tradeRMultiple } from "@/lib/stats";
import { formatDayParam } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { Trade } from "@/lib/db/schema";

const OUTCOME_LABEL: Record<string, string> = {
  win: "Win",
  loss: "Loss",
  breakeven: "Breakeven",
};

export function TradesTable({ trades }: { trades: Trade[] }) {
  const rows = [...trades]
    .sort((a, b) => b.tradedAt.getTime() - a.tradedAt.getTime())
    .slice(0, 15);

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-400 shadow-sm">
        Nog geen trades gelogd.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs text-slate-500">
              <th className="px-4 py-2 font-medium">Datum</th>
              <th className="px-4 py-2 font-medium">Pair</th>
              <th className="px-4 py-2 font-medium">Richting</th>
              <th className="px-4 py-2 font-medium">Uitkomst</th>
              <th className="px-4 py-2 text-right font-medium">RR</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((trade) => {
              const r = tradeRMultiple(trade);
              return (
                <tr
                  key={trade.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  <td className="px-4 py-2.5">
                    <Link
                      href={`/day/${formatDayParam(trade.tradedAt)}`}
                      className="text-slate-500 hover:text-indigo-600"
                    >
                      {format(trade.tradedAt, "d MMM yyyy")}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 font-medium text-slate-900">
                    {trade.pair}
                  </td>
                  <td className="px-4 py-2.5 text-slate-600">
                    {trade.direction === "long" ? "Long" : "Short"}
                  </td>
                  <td className="px-4 py-2.5">
                    {trade.outcome ? (
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                          trade.outcome === "win" &&
                            "bg-emerald-100 text-emerald-700",
                          trade.outcome === "loss" &&
                            "bg-rose-100 text-rose-700",
                          trade.outcome === "breakeven" &&
                            "bg-slate-100 text-slate-600",
                        )}
                      >
                        {OUTCOME_LABEL[trade.outcome]}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Open</span>
                    )}
                  </td>
                  <td
                    className={cn(
                      "px-4 py-2.5 text-right font-medium",
                      r > 0 && "text-emerald-600",
                      r < 0 && "text-rose-600",
                      r === 0 && "text-slate-500",
                    )}
                  >
                    {trade.outcome ? `${r > 0 ? "+" : ""}${r.toFixed(2)}R` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
