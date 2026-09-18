import { toYoutubeEmbedUrl } from "./youtube";

export type RecipeSourcePlatform = "youtube" | "tiktok" | "other";

const TIKTOK_VIDEO_ID = /tiktok\.com\/@[^/]+\/video\/(\d+)/;

/** Extracts the numeric id from a TikTok video URL, e.g. .../video/1234567890. */
function toTiktokEmbedUrl(url: string): string | null {
  const match = url.match(TIKTOK_VIDEO_ID);
  if (!match) return null;
  return `https://www.tiktok.com/embed/v2/${match[1]}`;
}

export function detectSourcePlatform(url: string): RecipeSourcePlatform {
  if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
  if (/tiktok\.com/.test(url)) return "tiktok";
  return "other";
}

/** Builds an embeddable iframe URL for a YouTube or TikTok video link, if recognized. */
export function buildEmbedUrl(url: string): string | null {
  return toYoutubeEmbedUrl(url) ?? toTiktokEmbedUrl(url);
}
