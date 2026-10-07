import type { Trade } from "./db/schema";
import { tradeRMultiple } from "./stats";

/** Every backtest trade risks this share of the current balance. */
export const BACKTEST_RISK_PCT = 10;

export interface BacktestPnl {
  /** Balance after each trade, starting with the starting balance itself. */
  curve: { label: string; value: number }[];
  endBalance: number;
  pnl: number;
  returnPct: number;
}

/**
 * Replays a session's trades on an account that starts at `startingBalance`
 * and risks BACKTEST_RISK_PCT of the running balance per trade: a loss
 * costs 10%, a win earns 10% × RR, breakeven leaves it unchanged. The risk
 * compounds — it's 10% of what's in the account at that moment.
 */
export function computeBacktestPnl(
  trades: Pick<Trade, "outcome" | "rr">[],
  startingBalance: number,
): BacktestPnl {
  let balance = startingBalance;
  const curve = [{ label: "Start", value: balance }];

  trades
    .filter((t) => t.outcome != null)
    .forEach((trade, i) => {
      const risk = balance * (BACKTEST_RISK_PCT / 100);
      balance += risk * tradeRMultiple(trade);
      curve.push({ label: `#${i + 1}`, value: balance });
    });

  const pnl = balance - startingBalance;
  return {
    curve,
    endBalance: balance,
    pnl,
    returnPct: startingBalance > 0 ? (pnl / startingBalance) * 100 : 0,
  };
}
