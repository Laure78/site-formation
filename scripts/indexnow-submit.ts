#!/usr/bin/env npx tsx
/**
 * Soumission manuelle IndexNow.
 *
 * Usage :
 *   npm run indexnow -- https://www.laureolivie.fr/formations
 *   npm run indexnow -- /formations /blog/mon-article
 */
import { submitIndexNow } from '@/lib/indexnow';
import { INDEXNOW_KEY, INDEXNOW_KEY_FILE_URL, INDEXNOW_SITE_ORIGIN } from '@/lib/indexnow-config';
import { dedupeValidIndexNowUrls, pathToAbsoluteUrl } from '@/lib/indexnow-url-map';

function usage(): void {
  console.log(`Usage: npm run indexnow -- <url-or-path> [url-or-path ...]

Exemples:
  npm run indexnow -- https://www.laureolivie.fr/formations
  npm run indexnow -- /formations /blog/chatgpt-btp-7-leviers-productivite-2026

Clé IndexNow : ${INDEXNOW_KEY}
Fichier clé  : ${INDEXNOW_KEY_FILE_URL}
`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2).filter((a) => a !== '--');
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    usage();
    process.exit(args.length === 0 ? 1 : 0);
  }

  const candidates = args.map((arg) => {
    if (arg.startsWith('http://') || arg.startsWith('https://')) return arg;
    return pathToAbsoluteUrl(arg, INDEXNOW_SITE_ORIGIN) ?? arg;
  });

  const valid = dedupeValidIndexNowUrls(candidates);
  const rejected = args.length - valid.length;

  console.log('--- IndexNow — soumission manuelle ---');
  console.log(`Clé        : ${INDEXNOW_KEY}`);
  console.log(`Retenues   : ${valid.length}`);
  if (rejected > 0) console.log(`Rejetées   : ${rejected} (domaine, tracking, zone technique…)`);
  valid.forEach((u) => console.log(`  • ${u}`));

  if (valid.length === 0) {
    console.error('\nAucune URL valide. Abandon.');
    process.exit(1);
  }

  const result = await submitIndexNow(valid, { retryAfterMs: 60_000 });

  console.log(`\nHTTP ${result.status} ${result.statusText}`);
  console.log(result.message);

  process.exit(result.ok ? 0 : 1);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
