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

export interface ModuleProgress {
  module: LessonModule;
  completed: number;
  total: number;
}

export interface NextLessonInfo {
  /** The lesson to watch next, or null when nothing is in progress. */
  nextLesson: Lesson | null;
  module: LessonModule | null;
  /**
   * Set when the last playlist you worked in is finished and no other one
   * is in progress: the playlists that still have unfinished lessons.
   */
  openModules: ModuleProgress[] | null;
}

function progressOf(module: LessonModule): ModuleProgress {
  return {
    module,
    completed: module.lessons.filter((l) => l.completed).length,
    total: module.lessons.length,
  };
}

/** The lesson right after the last completed one (lessons are in list order). */
function nextInModule(module: LessonModule): Lesson | null {
  const lastDone = module.lessons.findLastIndex((l) => l.completed);
  return (
    module.lessons.slice(lastDone + 1).find((l) => !l.completed) ??
    module.lessons.find((l) => !l.completed) ??
    null
  );
}

/**
 * Works out what "Leren" on the dashboard should show:
 * - a playlist you've started but not finished → its next video
 * - nothing started yet → the first video of the first playlist
 * - every started playlist finished → the playlists still open
 */
export function getNextLessonInfo(modules: LessonModule[]): NextLessonInfo {
  const progress = modules.map(progressOf);

  const inProgress = progress.find(
    (p) => p.completed > 0 && p.completed < p.total,
  );
  if (inProgress) {
    return {
      nextLesson: nextInModule(inProgress.module),
      module: inProgress.module,
      openModules: null,
    };
  }

  const open = progress.filter((p) => p.completed < p.total);
  const anyStarted = progress.some((p) => p.completed > 0);
  if (!anyStarted && open.length > 0) {
    return {
      nextLesson: nextInModule(open[0].module),
      module: open[0].module,
      openModules: null,
    };
  }

  return { nextLesson: null, module: null, openModules: open };
}
