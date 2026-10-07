import Link from "next/link";
import { getAllLiveTrades } from "@/lib/trades";
import { computeDashboardStats, tradeRMultiple } from "@/lib/stats";
import { dayKey, parseMonthParam } from "@/lib/date";
import { MonthCalendar, type DayResult } from "@/components/calendar/MonthCalendar";
import { StatsPanel } from "@/components/stats/StatsPanel";
import { TradesTable } from "@/components/dashboard/TradesTable";

export default async function TradingDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month } = await searchParams;
  const monthDate = parseMonthParam(month);

  const liveTrades = await getAllLiveTrades();
  const stats = computeDashboardStats(liveTrades);

  const dailyResults = new Map<string, DayResult>();
  for (const trade of liveTrades) {
    const key = dayKey(trade.tradedAt);
    const existing = dailyResults.get(key) ?? { count: 0, netR: 0, pnl: null };
    existing.count += 1;
    existing.netR += tradeRMultiple(trade);
    if (trade.pnl != null) existing.pnl = (existing.pnl ?? 0) + trade.pnl;
    dailyResults.set(key, existing);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Trading</h1>
        <Link
          href="/api/trades/export"
          className="rounded-lg border border-slate-200 bg-surface px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Exporteer CSV
        </Link>
      </div>

      <StatsPanel stats={stats} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div>
          <MonthCalendar monthDate={monthDate} dailyResults={dailyResults} />
        </div>
        <div className="min-w-0">
          <p className="mb-2 text-xs font-medium text-slate-500">
            Recente trades
          </p>
          <TradesTable trades={liveTrades} />
        </div>
      </div>
    </div>
  );
}
