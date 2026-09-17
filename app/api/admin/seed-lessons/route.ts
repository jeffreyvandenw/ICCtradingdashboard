import { like } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { lessons } from "@/lib/db/schema";
import { seedLessons as seedSciTrendsLessons } from "@/scripts/seed-data/sci-trends-lessons";
import { seedLessons as seedBestSimplePriceActionLessons } from "@/scripts/seed-data/best-simple-price-action-lessons";
import { seedLessons as seedKoddzTradeBreakdowns } from "@/scripts/seed-data/koddz-trade-breakdowns";

const LESSON_SETS = [
  { titlePrefix: "SCI — Les", seed: seedSciTrendsLessons },
  { titlePrefix: "Price Action — Les", seed: seedBestSimplePriceActionLessons },
  { titlePrefix: "Koddz — Trade", seed: seedKoddzTradeBreakdowns },
];

export async function GET() {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized — log eerst in op de site.", {
      status: 401,
    });
  }

  const results: string[] = [];
  for (const set of LESSON_SETS) {
    const existing = await db
      .select({ id: lessons.id })
      .from(lessons)
      .where(like(lessons.title, `${set.titlePrefix}%`));

    if (existing.length > 0) {
      results.push(`${set.titlePrefix}: al aanwezig (${existing.length} lessen), overgeslagen.`);
      continue;
    }

    await set.seed();
    results.push(`${set.titlePrefix}: toegevoegd.`);
  }

  return new Response(results.join("\n") + "\n\nGa naar /learn om de lessen te bekijken.");
}
