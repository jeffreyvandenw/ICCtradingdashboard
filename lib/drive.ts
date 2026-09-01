/**
 * Converts a Google Drive share link to its /preview embed URL.
 * Accepts the usual share formats:
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   https://drive.google.com/open?id=FILE_ID
 * Returns null if no file id can be found (caller should just link out instead).
 */
export function toDriveEmbedUrl(url: string): string | null {
  const pathMatch = url.match(/\/file\/d\/([^/]+)/);
  if (pathMatch) return `https://drive.google.com/file/d/${pathMatch[1]}/preview`;

  const idMatch = url.match(/[?&]id=([^&]+)/);
  if (idMatch) return `https://drive.google.com/file/d/${idMatch[1]}/preview`;

  return null;
}
