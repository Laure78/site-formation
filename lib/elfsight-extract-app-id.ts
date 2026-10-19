/**
 * Extraction de l’UUID widget depuis le code d’installation Elfsight officiel.
 * @see lib/elfsight-google-reviews.ts
 */

/** UUID v4 dans `elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`. */
export const ELFSIGHT_APP_ID_IN_EMBED_RE =
  /elfsight-app-([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i;

export function normalizeElfsightAppId(raw: string | undefined | null): string {
  const trimmed = raw?.trim() ?? '';
  if (!trimmed) return '';
  const fromClass = trimmed.match(ELFSIGHT_APP_ID_IN_EMBED_RE);
  if (fromClass?.[1]) return fromClass[1];
  return trimmed.replace(/^elfsight-app-/, '');
}

export function extractElfsightAppIdFromEmbed(embedCode: string): string {
  const match = embedCode.match(ELFSIGHT_APP_ID_IN_EMBED_RE);
  return match?.[1] ?? '';
}
