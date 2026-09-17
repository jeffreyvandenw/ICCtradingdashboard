import { toYoutubeEmbedUrl } from "@/lib/youtube";

export function VideoEmbed({ url }: { url: string }) {
  const embedUrl = toYoutubeEmbedUrl(url);

  if (!embedUrl) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="block text-sm text-sky-600 hover:underline"
      >
        Video / bron bekijken
      </a>
    );
  }

  return (
    <iframe
      src={embedUrl}
      className="aspect-video w-full rounded-lg border border-neutral-200"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}
