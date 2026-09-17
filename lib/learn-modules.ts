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
};

export interface LessonModule {
  key: string;
  label: string;
  lessons: Lesson[];
}

/** Groups lessons by the YouTube playlist their video belongs to. */
export function groupLessonsByModule(lessons: Lesson[]): LessonModule[] {
  const groups = new Map<string, LessonModule>();

  for (const lesson of lessons) {
    const playlistId = lesson.videoRef
      ? extractYoutubePlaylistId(lesson.videoRef)
      : null;
    const key = playlistId ?? "overig";
    const label = playlistId
      ? (PLAYLIST_LABELS[playlistId] ?? `Playlist ${playlistId}`)
      : "Overig";

    const group = groups.get(key);
    if (group) {
      group.lessons.push(lesson);
    } else {
      groups.set(key, { key, label, lessons: [lesson] });
    }
  }

  return Array.from(groups.values());
}
