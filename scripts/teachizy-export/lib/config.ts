import path from 'node:path';

/** Espace apprenant connu du projet (voir lib/external-site-urls.ts). */
export const DEFAULT_STORE_URL = 'https://formation-ia-chatgpt.teachizy.fr/';

/** Console d’administration Teachizy (connexion formateur). */
export const DEFAULT_ADMIN_URL = 'https://app.teachizy.fr/';

export const API_BASE = 'https://api.teachizy.fr/api/v1';

/** Racine du dépôt — les scripts npm sont lancés depuis la racine. */
export function projectRoot(): string {
  return process.cwd();
}

export function authDir(): string {
  return path.join(projectRoot(), '.teachizy-auth');
}

export function storageStatePath(): string {
  return path.join(authDir(), 'storage-state.json');
}

export function exportRoot(): string {
  return path.join(projectRoot(), 'teachizy-export');
}

export function manifestPath(): string {
  return path.join(exportRoot(), 'manifest.json');
}

export function bilanPath(): string {
  return path.join(exportRoot(), 'bilan.txt');
}

export function fingerprintsPath(): string {
  return path.join(exportRoot(), 'fingerprints.json');
}

/** Pause minimale entre requêtes (ms). */
export const REQUEST_DELAY_MS = 800;

/** Tentatives max par téléchargement. */
export const MAX_RETRIES = 3;

/** Timeout login utilisateur (ms). */
export const LOGIN_TIMEOUT_MS = 15 * 60 * 1000;
