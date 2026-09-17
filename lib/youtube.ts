const WATCH_ID = /[?&]v=([^&]+)/;
const SHORT_ID = /youtu\.be\/([^?&]+)/;
const EMBED_ID = /youtube\.com\/embed\/([^?&]+)/;

/**
 * Converts a YouTube watch/short/embed URL to its /embed/VIDEO_ID form.
 * Returns null if no video id can be found (caller should just link out instead).
 */
export function toYoutubeEmbedUrl(url: string): string | null {
  const match = url.match(WATCH_ID) ?? url.match(SHORT_ID) ?? url.match(EMBED_ID);
  if (!match) return null;
  return `https://www.youtube.com/embed/${match[1]}`;
}

/** Extracts the `list=` playlist id from a YouTube URL, if present. */
export function extractYoutubePlaylistId(url: string): string | null {
  const match = url.match(/[?&]list=([^&]+)/);
  return match ? match[1] : null;
}
