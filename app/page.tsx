import Link from "next/link";
import { getAllLiveTrades } from "@/lib/trades";
import { computeDashboardStats, tradeRMultiple } from "@/lib/stats";
import { dayKey, parseMonthParam } from "@/lib/date";
import { MonthCalendar, type DayResult } from "@/components/calendar/MonthCalendar";
import { StatsPanel } from "@/components/stats/StatsPanel";

export default async function DashboardPage({
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
    const existing = dailyResults.get(key) ?? { count: 0, netR: 0 };
    existing.count += 1;
    existing.netR += tradeRMultiple(trade);
    dailyResults.set(key, existing);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Dashboard
        </h1>
        <Link
          href="/api/trades/export"
          className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          Exporteer CSV
        </Link>
      </div>

      <StatsPanel stats={stats} />

      <MonthCalendar monthDate={monthDate} dailyResults={dailyResults} />
    </div>
  );
}
