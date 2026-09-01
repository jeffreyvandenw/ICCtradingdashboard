export type Direction = "long" | "short";

/**
 * RR based on planned stop loss and take profit, direction-aware.
 * Returns null when inputs are missing or the stop is on the wrong side of entry.
 */
export function calculateRR(
  direction: Direction,
  entry: number,
  stopLoss: number | null | undefined,
  takeProfit: number | null | undefined,
): number | null {
  if (stopLoss == null || takeProfit == null) return null;

  const risk =
    direction === "long" ? entry - stopLoss : stopLoss - entry;
  const reward =
    direction === "long" ? takeProfit - entry : entry - takeProfit;

  if (risk <= 0 || reward <= 0) return null;

  return reward / risk;
}
