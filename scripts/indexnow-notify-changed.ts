#!/usr/bin/env npx tsx
/**
 * Notifie IndexNow uniquement pour les pages probablement modifiées (git diff).
 * Ne soumet jamais le sitemap entier.
 *
 * Usage :
 *   INDEXNOW_AUTO_SUBMIT=1 npm run indexnow:changed
 *   INDEXNOW_AUTO_SUBMIT=1 INDEXNOW_BASE_REF=abc123 npm run indexnow:changed
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { submitIndexNow } from '@/lib/indexnow';
import { INDEXNOW_KEY, INDEXNOW_KEY_FILE_URL } from '@/lib/indexnow-config';
import { dedupeValidIndexNowUrls, pathToAbsoluteUrl, routesFromChangedFiles } from '@/lib/indexnow-url-map';

const ROOT = process.cwd();
const STATE_FILE = path.join(ROOT, '.indexnow-state.json');

type IndexNowState = {
  lastCommit: string;
  lastSubmittedAt: string;
  lastUrls: string[];
};

function readState(): IndexNowState | null {
  if (!existsSync(STATE_FILE)) return null;
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8')) as IndexNowState;
  } catch {
    return null;
  }
}

function writeState(state: IndexNowState): void {
  writeFileSync(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

function git(cmd: string): string {
  return execSync(cmd, { encoding: 'utf8', cwd: ROOT, stdio: ['pipe', 'pipe', 'pipe'] }).trim();
}

function getChangedFiles(baseRef: string): string[] {
  const out = git(`git diff --name-only ${baseRef} HEAD`);
  if (!out) return [];
  return out.split('\n').filter(Boolean);
}

function getDeletedFiles(baseRef: string): string[] {
  const out = git(`git diff --diff-filter=D --name-only ${baseRef} HEAD`);
  if (!out) return [];
  return out.split('\n').filter(Boolean);
}

async function main(): Promise<void> {
  if (process.env.INDEXNOW_AUTO_SUBMIT !== '1') {
    console.log('[indexnow:changed] INDEXNOW_AUTO_SUBMIT≠1 — aucune soumission (volontaire).');
    process.exit(0);
  }

  const head = git('git rev-parse HEAD');
  const state = readState();
  const baseRef =
    process.env.INDEXNOW_BASE_REF?.trim() ||
    state?.lastCommit ||
    'HEAD~1';

  if (baseRef === head) {
    console.log('[indexnow:changed] Aucun nouveau commit.');
    process.exit(0);
  }

  const modified = getChangedFiles(baseRef);
  const deleted = getDeletedFiles(baseRef);
  const allFiles = [...modified, ...deleted];

  if (allFiles.length === 0) {
    console.log('[indexnow:changed] Aucun fichier modifié détecté.');
    writeState({ lastCommit: head, lastSubmittedAt: new Date().toISOString(), lastUrls: [] });
    process.exit(0);
  }

  const routes = routesFromChangedFiles(allFiles);
  const urls = dedupeValidIndexNowUrls(
    routes.map((r) => pathToAbsoluteUrl(r)).filter((u): u is string => u != null),
  );

  console.log('--- IndexNow — changements détectés ---');
  console.log(`Base ref    : ${baseRef}`);
  console.log(`HEAD        : ${head}`);
  console.log(`Fichiers    : ${allFiles.length}`);
  console.log(`Clé         : ${INDEXNOW_KEY}`);
  console.log(`Fichier clé : ${INDEXNOW_KEY_FILE_URL}`);

  if (urls.length === 0) {
    console.log('Aucune URL publique dérivée — pas de soumission (évite le spam).');
    writeState({ lastCommit: head, lastSubmittedAt: new Date().toISOString(), lastUrls: [] });
    process.exit(0);
  }

  console.log(`URL à soumettre (${urls.length}) :`);
  urls.forEach((u) => console.log(`  • ${u}`));

  const result = await submitIndexNow(urls, { retryAfterMs: 60_000 });
  console.log(`\nHTTP ${result.status} — ${result.message}`);

  if (result.ok) {
    writeState({
      lastCommit: head,
      lastSubmittedAt: new Date().toISOString(),
      lastUrls: urls,
    });
  }

  process.exit(result.ok ? 0 : 1);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
