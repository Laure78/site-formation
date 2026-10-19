/**
 * Résolution serveur / build de l’identifiant Elfsight (env, embed collé, fichier local).
 * Utilisé par `next.config.ts` pour exposer `NEXT_PUBLIC_ELFSIGHT_GOOGLE_REVIEWS_APP_ID`.
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  extractElfsightAppIdFromEmbed,
  normalizeElfsightAppId,
} from './elfsight-extract-app-id';

const CONFIG_EMBED_REL = 'config/elfsight-google-reviews.embed';

export function resolveElfsightGoogleReviewsAppId(projectRoot: string): string {
  const fromEnv = normalizeElfsightAppId(
    process.env.NEXT_PUBLIC_ELFSIGHT_GOOGLE_REVIEWS_APP_ID,
  );
  if (fromEnv) return fromEnv;

  const embedEnv = process.env.NEXT_PUBLIC_ELFSIGHT_GOOGLE_REVIEWS_EMBED?.trim();
  if (embedEnv) {
    const fromEmbedEnv = extractElfsightAppIdFromEmbed(embedEnv);
    if (fromEmbedEnv) return fromEmbedEnv;
  }

  const embedPath = path.join(projectRoot, CONFIG_EMBED_REL);
  try {
    if (fs.existsSync(embedPath)) {
      const content = fs.readFileSync(embedPath, 'utf8');
      const fromFile = extractElfsightAppIdFromEmbed(content);
      if (fromFile) return fromFile;
    }
  } catch {
    /* fichier absent ou illisible */
  }

  return '';
}
