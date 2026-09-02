import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

/** Hôte IndexNow (sans schéma). */
export const INDEXNOW_HOST = 'www.laureolivie.fr';

/** URL canonique du site (schéma + host). */
export const INDEXNOW_SITE_ORIGIN = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

/**
 * Clé IndexNow — fichier public `public/{INDEXNOW_KEY}.txt`.
 * Surcharge possible via INDEXNOW_KEY (Vercel / Railway).
 */
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY?.trim() || 'e05un916c5fd0496fbfbun9c2d975712b4';

export const INDEXNOW_KEY_FILE_URL = `${INDEXNOW_SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;

export const INDEXNOW_API_ENDPOINT = 'https://api.indexnow.org/indexnow';

/** Max URL par requête (protocole IndexNow). */
export const INDEXNOW_MAX_URLS_PER_REQUEST = 10_000;
