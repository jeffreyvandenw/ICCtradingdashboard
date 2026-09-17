import type { Lesson } from "./db/schema";
import { extractYoutubePlaylistId } from "./youtube";

/**
 * Human-readable names for known YouTube playlist ids. Lessons whose
 * videoRef points at a playlist not listed here fall back to a generic
 * "Playlist ..." label; lessons without a recognizable playlist id land
 * in a single "Overig" group.
 */
const PLAYLIST_LABELS: Record<string, string> = {
  PLmaCbAD6I1AwZRrgd1TJ_T4Mnx0fKc33h: "SCI — Trends & Market Structure",
  PLmaCbAD6I1AyI7jO4SiM38hgc2pWgFOG_: "Best Simple Price Action Trading Course",
  PLguWwLNVYKWdw0qsZWLLzwJlw6sWKUsjI: "JaeFX — Mastering Liquidity",
};

export interface LessonModule {
  key: string;
  label: string;
  lessons: Lesson[];
}

/**
 * For lessons without a playlist id in their videoRef (e.g. individually
 * linked videos rather than a full playlist), fall back to the title's
 * "<prefix> — ..." convention so lessons from the same source still group
 * together instead of all landing in one generic bucket.
 */
function titlePrefixKey(title: string): string | null {
  const dashIndex = title.indexOf(" — ");
  return dashIndex === -1 ? null : title.slice(0, dashIndex);
}

/** Groups lessons by the YouTube playlist their video belongs to. */
export function groupLessonsByModule(lessons: Lesson[]): LessonModule[] {
  const groups = new Map<string, LessonModule>();

  for (const lesson of lessons) {
    const playlistId = lesson.videoRef
      ? extractYoutubePlaylistId(lesson.videoRef)
      : null;
    const titlePrefix = titlePrefixKey(lesson.title);

    const key = playlistId ?? titlePrefix ?? "overig";
    const label = playlistId
      ? (PLAYLIST_LABELS[playlistId] ?? `Playlist ${playlistId}`)
      : (titlePrefix ?? "Overig");

    const group = groups.get(key);
    if (group) {
      group.lessons.push(lesson);
    } else {
      groups.set(key, { key, label, lessons: [lesson] });
    }
  }

  return Array.from(groups.values());
}
