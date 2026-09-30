import { toYoutubeWatchUrl } from "@/lib/youtube";

export function VideoLink({
  embedUrl,
  sourceUrl,
}: {
  embedUrl: string | null;
  sourceUrl: string | null;
}) {
  const url = sourceUrl ?? embedUrl;
  if (!url) return null;
  const href = toYoutubeWatchUrl(url);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-indigo-600 shadow-sm hover:bg-slate-50 hover:underline"
    >
      <span aria-hidden>▶</span>
      <span>Bekijk video</span>
      <span className="ml-auto truncate text-xs font-normal text-slate-400">
        {href}
      </span>
    </a>
  );
}
