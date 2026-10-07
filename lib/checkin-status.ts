import type { CheckIn } from "./db/schema";

export type CheckInDayStatus = "green" | "orange" | "red" | "neutral";

/**
 * A day is:
 * - green: filled in, and both answers are "ja" — you did what you said
 * - orange: filled in, but at least one answer is "nee"
 * - red: it's in the past, on/after the first-ever check-in (so the habit
 *   was already "active"), and nothing was filled in — a missed day
 * - neutral: today (still fillable, not a miss yet), a future day, or a
 *   day before the habit started (nothing to hold you accountable for)
 *
 * Day strings are "yyyy-MM-dd", which sort lexicographically = chronologically.
 */
export function checkInDayStatus({
  day,
  today,
  firstDay,
  entry,
}: {
  day: string;
  today: string;
  firstDay: string | null;
  entry: Pick<CheckIn, "didAsPromised" | "confidentTomorrow"> | undefined;
}): CheckInDayStatus {
  if (entry) {
    return entry.didAsPromised && entry.confidentTomorrow ? "green" : "orange";
  }
  if (day >= today) return "neutral";
  if (!firstDay || day < firstDay) return "neutral";
  return "red";
}
