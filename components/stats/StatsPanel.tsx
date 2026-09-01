import type { DashboardStats } from "@/lib/stats";
import { EquityCurveChart } from "./EquityCurveChart";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        {value}
      </p>
    </div>
  );
}

function fmtPct(value: number | null): string {
  return value == null ? "—" : `${value.toFixed(1)}%`;
}

function fmtNum(value: number | null): string {
  if (value == null) return "—";
  if (!Number.isFinite(value)) return "∞";
  return value.toFixed(2);
}

export function StatsPanel({ stats }: { stats: DashboardStats }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard label="Trades" value={String(stats.tradeCount)} />
        <StatCard label="Gem. RR" value={fmtNum(stats.avgRR)} />
        <StatCard label="Winrate" value={fmtPct(stats.winratePct)} />
        <StatCard
          label="Trades / week"
          value={fmtNum(stats.avgTradesPerWeek)}
        />
        <StatCard label="Profit factor" value={fmtNum(stats.profitFactor)} />
        <StatCard label="Expectancy" value={`${fmtNum(stats.expectancy)}R`} />
        <StatCard
          label="Winrate long"
          value={fmtPct(stats.winrateByDirection.long)}
        />
        <StatCard
          label="Winrate short"
          value={fmtPct(stats.winrateByDirection.short)}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard
          label="Winrate London"
          value={fmtPct(stats.winrateBySession.london)}
        />
        <StatCard label="Winrate NY" value={fmtPct(stats.winrateBySession.ny)} />
        <StatCard
          label="Winrate Asia"
          value={fmtPct(stats.winrateBySession.asia)}
        />
      </div>

      <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="mb-2 text-xs text-neutral-500">Equity curve (R)</p>
        <EquityCurveChart data={stats.equityCurve} />
      </div>
    </div>
  );
}
