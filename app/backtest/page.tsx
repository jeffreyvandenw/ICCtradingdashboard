import Link from "next/link";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { trades } from "@/lib/db/schema";
import { getBacktestSessions } from "@/lib/backtest";
import { computeDashboardStats } from "@/lib/stats";
import { NewSessionForm } from "@/components/backtest/NewSessionForm";

export default async function BacktestOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ lessonId?: string; hypothesis?: string }>;
}) {
  const { lessonId, hypothesis } = await searchParams;
  const sessions = await getBacktestSessions();
  const backtestTrades = await db
    .select()
    .from(trades)
    .where(eq(trades.type, "backtest"));

  const tradesBySession = new Map<string, typeof backtestTrades>();
  for (const trade of backtestTrades) {
    if (!trade.backtestSessionId) continue;
    const list = tradesBySession.get(trade.backtestSessionId) ?? [];
    list.push(trade);
    tradesBySession.set(trade.backtestSessionId, list);
  }

  const activeSessionId = sessions[0]?.id;

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
      <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
        Backtesten
      </h1>

      <NewSessionForm defaultHypothesis={hypothesis} lessonId={lessonId} />

      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-neutral-50 text-xs text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-3 py-2">Datum</th>
              <th className="px-3 py-2">Hypothese</th>
              <th className="px-3 py-2">Trades</th>
              <th className="px-3 py-2">Winrate</th>
              <th className="px-3 py-2">Gem. RR</th>
              <th className="px-3 py-2">Netto R</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => {
              const sessionTrades = tradesBySession.get(session.id) ?? [];
              const stats = computeDashboardStats(sessionTrades);
              const netR = stats.equityCurve.at(-1)?.cumulativeR ?? 0;

              return (
                <tr
                  key={session.id}
                  className="border-t border-neutral-200 dark:border-neutral-800"
                >
                  <td className="px-3 py-2 whitespace-nowrap">
                    {format(session.createdAt, "d MMM yyyy")}
                    {session.id === activeSessionId && (
                      <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                        actief
                      </span>
                    )}
                  </td>
                  <td className="max-w-xs truncate px-3 py-2">
                    {session.hypothesis}
                  </td>
                  <td className="px-3 py-2">{stats.tradeCount}</td>
                  <td className="px-3 py-2">
                    {stats.winratePct == null
                      ? "—"
                      : `${stats.winratePct.toFixed(1)}%`}
                  </td>
                  <td className="px-3 py-2">
                    {stats.avgRR == null ? "—" : stats.avgRR.toFixed(2)}
                  </td>
                  <td className="px-3 py-2">
                    {netR > 0 ? "+" : ""}
                    {netR.toFixed(2)}R
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      href={`/backtest/${session.id}`}
                      className="text-sky-600 hover:underline"
                    >
                      Openen
                    </Link>
                  </td>
                </tr>
              );
            })}
            {sessions.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-6 text-center text-neutral-400"
                >
                  Nog geen backtest-sessies.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
