import type { DashboardStats } from "@/lib/stats";
import { cn } from "@/lib/utils";
import { EquityCurveChart } from "./EquityCurveChart";

type Tone = "pos" | "neg" | "neutral";

function toneClasses(tone: Tone): string {
  if (tone === "pos") return "text-emerald-600";
  if (tone === "neg") return "text-rose-600";
  return "text-slate-900";
}

function HeroCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: Tone;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className={cn("mt-1.5 text-2xl font-semibold", toneClasses(tone))}>
        {value}
      </p>
    </div>
  );
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
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

function fmtR(value: number): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}R`;
}

function toneOf(value: number | null, positiveFrom = 0): Tone {
  if (value == null) return "neutral";
  if (!Number.isFinite(value)) return "pos";
  if (value > positiveFrom) return "pos";
  if (value < positiveFrom) return "neg";
  return "neutral";
}

export function StatsPanel({ stats }: { stats: DashboardStats }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <HeroCard
          label="Net resultaat"
          value={fmtR(stats.netR)}
          tone={toneOf(stats.netR)}
        />
        <HeroCard label="Winrate" value={fmtPct(stats.winratePct)} />
        <HeroCard
          label="Profit factor"
          value={fmtNum(stats.profitFactor)}
          tone={toneOf(stats.profitFactor, 1)}
        />
        <HeroCard
          label="Gem. RR"
          value={fmtNum(stats.avgRR)}
          tone={toneOf(stats.avgRR)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        <MiniCard label="Trades" value={String(stats.tradeCount)} />
        <MiniCard
          label="Trades / week"
          value={fmtNum(stats.avgTradesPerWeek)}
        />
        <MiniCard label="Expectancy" value={`${fmtNum(stats.expectancy)}R`} />
        <MiniCard
          label="Winrate long"
          value={fmtPct(stats.winrateByDirection.long)}
        />
        <MiniCard
          label="Winrate short"
          value={fmtPct(stats.winrateByDirection.short)}
        />
        <MiniCard
          label="Winrate NY"
          value={fmtPct(stats.winrateBySession.ny)}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-xs font-medium text-slate-500">
          Equity curve (R)
        </p>
        <EquityCurveChart data={stats.equityCurve} />
      </div>
    </div>
  );
}
