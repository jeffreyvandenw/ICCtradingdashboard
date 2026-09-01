import "dotenv/config";
import { db } from "../lib/db";
import { trades } from "../lib/db/schema";
import { calculateRR } from "../lib/rr";
import type { Direction } from "../lib/rr";

const PAIRS = ["EURUSD", "GBPUSD", "XAUUSD", "US30", "NAS100"];
const SESSIONS = ["london", "ny", "asia"] as const;
const SETUP_TAGS = ["ICC continuation", "ICC correction-in-correction", "ICC indication reversal"];
const MISTAKE_TAGS = ["te vroeg in", "SL verplaatst", "FOMO", "geen confirmatie"];

function randomOf<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

async function seed() {
  console.log("Seeding dummy live trades...");

  const now = new Date();
  const rows = [];

  for (let daysAgo = 0; daysAgo < 90; daysAgo++) {
    // ~40% chance of trading on a given day
    if (Math.random() > 0.4) continue;

    const tradesOnDay = 1 + Math.floor(Math.random() * 3);

    for (let i = 0; i < tradesOnDay; i++) {
      const direction: Direction = Math.random() > 0.5 ? "long" : "short";
      const entry = randomBetween(1.05, 1.15) * 1000 / 1000;
      const riskDistance = randomBetween(0.001, 0.01);
      const rewardMultiple = randomBetween(1, 3.5);

      const stopLoss =
        direction === "long" ? entry - riskDistance : entry + riskDistance;
      const takeProfit =
        direction === "long"
          ? entry + riskDistance * rewardMultiple
          : entry - riskDistance * rewardMultiple;

      const plannedRR = calculateRR(direction, entry, stopLoss, takeProfit);

      const outcomeRoll = Math.random();
      const outcome: "win" | "loss" | "breakeven" =
        outcomeRoll < 0.5 ? "win" : outcomeRoll < 0.85 ? "loss" : "breakeven";

      const exitPrice =
        outcome === "win"
          ? takeProfit
          : outcome === "loss"
            ? stopLoss
            : entry;

      const tradedAt = new Date(now);
      tradedAt.setDate(tradedAt.getDate() - daysAgo);
      tradedAt.setHours(8 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60), 0, 0);

      rows.push({
        type: "live" as const,
        pair: randomOf(PAIRS),
        direction,
        entry,
        stopLoss,
        takeProfit,
        exitPrice,
        rr: plannedRR,
        outcome,
        tradedAt,
        session: randomOf(SESSIONS),
        setupTag: randomOf(SETUP_TAGS),
        mistakeTags: Math.random() > 0.7 ? [randomOf(MISTAKE_TAGS)] : [],
        notes: null,
        beforeNote: "Verwacht een continuation na de correctie op de 15m.",
        afterNote:
          outcome === "win"
            ? "Verliep volgens plan."
            : "Setup werkte niet zoals verwacht, evalueren.",
      });
    }
  }

  await db.insert(trades).values(rows);
  console.log(`Seeded ${rows.length} live trades.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
