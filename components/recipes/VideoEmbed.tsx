export function VideoEmbed({
  embedUrl,
  sourceUrl,
  title,
}: {
  embedUrl: string | null;
  sourceUrl: string | null;
  title: string;
}) {
  if (embedUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          src={embedUrl}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (sourceUrl) {
    return (
      <a
        href={sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="flex aspect-video w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-indigo-600 hover:underline"
      >
        Bekijk video →
      </a>
    );
  }

  return null;
}
