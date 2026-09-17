import "dotenv/config";
import { db } from "../lib/db";
import { backtestSessions, glossaryTerms, trades } from "../lib/db/schema";
import { calculateRR } from "../lib/rr";
import type { Direction } from "../lib/rr";
import { seedLessons as seedSciTrendsLessons } from "./seed-data/sci-trends-lessons";
import { seedLessons as seedBestSimplePriceActionLessons } from "./seed-data/best-simple-price-action-lessons";
import { seedLessons as seedKoddzTradeBreakdowns } from "./seed-data/koddz-trade-breakdowns";
import { seedLessons as seedJaeFxMasteringLiquidity } from "./seed-data/jaefx-mastering-liquidity";

const PAIRS = ["EURUSD", "GBPUSD", "XAUUSD", "US30", "NAS100"];
const SESSIONS = ["london", "ny", "asia"] as const;
const SETUP_TAGS = [
  "ICC continuation",
  "ICC correction-in-correction",
  "ICC indication reversal",
];
const MISTAKE_TAGS = ["te vroeg in", "SL verplaatst", "FOMO", "geen confirmatie"];

function randomOf<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function buildTrade(
  type: "live" | "backtest",
  tradedAt: Date,
  overrides: { backtestSessionId?: string } = {},
) {
  const direction: Direction = Math.random() > 0.5 ? "long" : "short";
  const entry = round(randomBetween(1.05, 1.15), 5);
  const riskDistance = round(randomBetween(0.001, 0.01), 5);
  const rewardMultiple = randomBetween(1, 3.5);

  const stopLoss =
    direction === "long"
      ? round(entry - riskDistance, 5)
      : round(entry + riskDistance, 5);
  const takeProfit =
    direction === "long"
      ? round(entry + riskDistance * rewardMultiple, 5)
      : round(entry - riskDistance * rewardMultiple, 5);

  const plannedRR = calculateRR(direction, entry, stopLoss, takeProfit);

  const outcomeRoll = Math.random();
  const outcome: "win" | "loss" | "breakeven" =
    outcomeRoll < 0.5 ? "win" : outcomeRoll < 0.85 ? "loss" : "breakeven";

  const exitPrice =
    outcome === "win" ? takeProfit : outcome === "loss" ? stopLoss : entry;

  return {
    type,
    backtestSessionId: overrides.backtestSessionId ?? null,
    pair: randomOf(PAIRS),
    direction,
    entry,
    stopLoss,
    takeProfit,
    exitPrice,
    rr: plannedRR,
    outcome,
    tradedAt,
    session: type === "live" ? randomOf(SESSIONS) : null,
    setupTag: randomOf(SETUP_TAGS),
    mistakeTags: Math.random() > 0.7 ? [randomOf(MISTAKE_TAGS)] : [],
    notes: null,
    beforeNote: "Verwacht een continuation na de correctie op de 15m.",
    afterNote:
      outcome === "win"
        ? "Verliep volgens plan."
        : "Setup werkte niet zoals verwacht, evalueren.",
  };
}

async function seedLiveTrades() {
  const now = new Date();
  const rows = [];

  for (let daysAgo = 0; daysAgo < 90; daysAgo++) {
    if (Math.random() > 0.4) continue;

    const tradesOnDay = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < tradesOnDay; i++) {
      const tradedAt = new Date(now);
      tradedAt.setDate(tradedAt.getDate() - daysAgo);
      tradedAt.setHours(
        8 + Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 60),
        0,
        0,
      );
      rows.push(buildTrade("live", tradedAt));
    }
  }

  await db.insert(trades).values(rows);
  console.log(`Seeded ${rows.length} live trades.`);
}

async function seedBacktestSessions() {
  const now = new Date();

  const sessionDefs = [
    {
      daysAgo: 5,
      hypothesis:
        "ICC continuation na een correctie werkt beter in de London-sessie dan in de NY-sessie.",
      summary:
        "Winrate lag hoger in London (3 van 4 trades) dan in NY (2 van 4). Kleine sample, verder testen.",
    },
    {
      daysAgo: 2,
      hypothesis:
        "Een indication-reversal met een duidelijke correction-in-correction geeft een hogere RR.",
      summary: null,
    },
    {
      daysAgo: 0,
      hypothesis:
        "Test of ICC continuation-setups op XAUUSD consistent een RR van 2+ halen.",
      summary: null,
    },
  ];

  for (const def of sessionDefs) {
    const createdAt = new Date(now);
    createdAt.setDate(createdAt.getDate() - def.daysAgo);

    const [session] = await db
      .insert(backtestSessions)
      .values({
        createdAt,
        hypothesis: def.hypothesis,
        summary: def.summary,
      })
      .returning();

    const rowCount = 3 + Math.floor(Math.random() * 3);
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      const tradedAt = new Date(createdAt);
      tradedAt.setHours(10 + i, 0, 0, 0);
      rows.push(buildTrade("backtest", tradedAt, { backtestSessionId: session.id }));
    }
    await db.insert(trades).values(rows);
  }

  console.log(`Seeded ${sessionDefs.length} backtest sessions.`);
}

async function seedGlossary() {
  await db.insert(glossaryTerms).values([
    {
      term: "Indication",
      definition:
        "De eerste impulsbeweging die een mogelijke richting van de markt aangeeft.",
    },
    {
      term: "Correction",
      definition:
        "De terugtrekking na de Indication, die de eerste impuls test voordat de markt (mogelijk) doorzet.",
    },
    {
      term: "Continuation",
      definition:
        "De hervatting van de oorspronkelijke richting na een geldige Correction.",
    },
    {
      term: "Correction-in-correction",
      definition:
        "Een Correction die zelf weer een kleinere ICC-structuur bevat; wordt vaak gezien als een sterker signaal.",
    },
  ]);

  console.log("Seeded 4 glossary terms.");
}

async function seed() {
  console.log("Seeding dummy data...");
  await seedLiveTrades();
  await seedBacktestSessions();
  await seedSciTrendsLessons();
  await seedBestSimplePriceActionLessons();
  await seedKoddzTradeBreakdowns();
  await seedJaeFxMasteringLiquidity();
  await seedGlossary();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
