export type CheckInDayStatus = "green" | "red" | "neutral";

/**
 * A day is:
 * - green: a check-in was filled in for it
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
  hasEntry,
}: {
  day: string;
  today: string;
  firstDay: string | null;
  hasEntry: boolean;
}): CheckInDayStatus {
  if (hasEntry) return "green";
  if (day >= today) return "neutral";
  if (!firstDay || day < firstDay) return "neutral";
  return "red";
}
