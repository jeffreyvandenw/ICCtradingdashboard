import type { Trade } from "./db/schema";

/**
 * Signed R-multiple contribution of a single trade:
 * - win: +RR (the planned reward/risk ratio)
 * - loss: -1R (you lost exactly the risk you planned, regardless of the target RR)
 * - breakeven: 0
 */
export function tradeRMultiple(trade: Pick<Trade, "outcome" | "rr">): number {
  if (trade.outcome === "win") return trade.rr ?? 0;
  if (trade.outcome === "loss") return -1;
  return 0;
}

export interface DashboardStats {
  tradeCount: number;
  netR: number;
  avgRR: number | null;
  winratePct: number | null;
  avgTradesPerWeek: number | null;
  profitFactor: number | null;
  expectancy: number | null;
  equityCurve: { date: string; cumulativeR: number }[];
  winrateByDirection: { long: number | null; short: number | null };
  winrateBySession: {
    london: number | null;
    ny: number | null;
    asia: number | null;
  };
}

function winrate(trades: Trade[]): number | null {
  if (trades.length === 0) return null;
  const wins = trades.filter((t) => t.outcome === "win").length;
  return (wins / trades.length) * 100;
}

export function computeDashboardStats(trades: Trade[]): DashboardStats {
  const decided = trades.filter((t) => t.outcome != null);

  const rrValues = decided
    .map((t) => t.rr)
    .filter((rr): rr is number => rr != null);
  const avgRR =
    rrValues.length > 0
      ? rrValues.reduce((a, b) => a + b, 0) / rrValues.length
      : null;

  const winratePct = winrate(decided);

  let avgTradesPerWeek: number | null = null;
  if (decided.length > 0) {
    const dates = decided.map((t) => t.tradedAt.getTime());
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const weeks = Math.max((maxDate - minDate) / (1000 * 60 * 60 * 24 * 7), 1);
    avgTradesPerWeek = decided.length / weeks;
  }

  const rMultiples = decided.map(tradeRMultiple);
  const grossProfit = rMultiples
    .filter((r) => r > 0)
    .reduce((a, b) => a + b, 0);
  const grossLoss = Math.abs(
    rMultiples.filter((r) => r < 0).reduce((a, b) => a + b, 0),
  );
  const profitFactor =
    grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : null;

  const expectancy =
    rMultiples.length > 0
      ? rMultiples.reduce((a, b) => a + b, 0) / rMultiples.length
      : null;

  const sortedByDate = [...decided].sort(
    (a, b) => a.tradedAt.getTime() - b.tradedAt.getTime(),
  );
  let cumulative = 0;
  const equityCurve = sortedByDate.map((t) => {
    cumulative += tradeRMultiple(t);
    return {
      date: t.tradedAt.toISOString(),
      cumulativeR: cumulative,
    };
  });

  const winrateByDirection = {
    long: winrate(decided.filter((t) => t.direction === "long")),
    short: winrate(decided.filter((t) => t.direction === "short")),
  };

  const winrateBySession = {
    london: winrate(decided.filter((t) => t.session === "london")),
    ny: winrate(decided.filter((t) => t.session === "ny")),
    asia: winrate(decided.filter((t) => t.session === "asia")),
  };

  return {
    tradeCount: decided.length,
    netR: cumulative,
    avgRR,
    winratePct,
    avgTradesPerWeek,
    profitFactor,
    expectancy,
    equityCurve,
    winrateByDirection,
    winrateBySession,
  };
}
