import { auth } from "@/auth";
import { db } from "@/lib/db";
import { lessons } from "@/lib/db/schema";
import { seedLessons } from "@/scripts/seed-data/sci-trends-lessons";

export async function GET() {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized — log eerst in op de site.", {
      status: 401,
    });
  }

  const existing = await db.select({ id: lessons.id }).from(lessons);
  if (existing.length > 0) {
    return new Response(
      `Er staan al ${existing.length} les(sen) in de database — niets gedaan om duplicaten te voorkomen.`,
    );
  }

  await seedLessons();
  return new Response(
    "6 SCI-lessen toegevoegd. Ga naar /learn om ze te bekijken.",
  );
}
