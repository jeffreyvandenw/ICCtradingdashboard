import { toDriveEmbedUrl } from "@/lib/drive";

export function ScreenshotPreview({ url }: { url: string }) {
  const embedUrl = toDriveEmbedUrl(url);

  if (!embedUrl) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-sky-600 hover:underline"
      >
        Screenshot
      </a>
    );
  }

  return (
    <iframe
      src={embedUrl}
      className="aspect-video w-full max-w-sm rounded-md border border-neutral-200 dark:border-neutral-800"
      allow="autoplay"
    />
  );
}
