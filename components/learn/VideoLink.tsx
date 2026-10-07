import { toYoutubeWatchUrl } from "@/lib/youtube";

export function VideoLink({ url }: { url: string }) {
  const href = toYoutubeWatchUrl(url);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-surface p-4 text-sm font-medium text-sky-600 hover:bg-neutral-50 hover:underline"
    >
      <span aria-hidden>▶</span>
      <span>Bekijk video op YouTube</span>
      <span className="ml-auto truncate text-xs font-normal text-neutral-400">
        {href}
      </span>
    </a>
  );
}
