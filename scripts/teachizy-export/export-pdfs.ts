#!/usr/bin/env npx tsx
/**
 * Export des supports PDF Teachizy → teachizy-export/
 *
 * Usage :
 *   npm run teachizy:export -- --inventory
 *   npm run teachizy:export -- --formation "L'IA" --max-formations 1
 *   npm run teachizy:export -- --login
 *   npm run teachizy:export -- --all
 *
 * Connexion : navigateur visible — ne jamais coller le mot de passe ici.
 * Session : .teachizy-auth/ (gitignored)
 */

import fs from 'node:fs';
import path from 'node:path';
import { config as loadEnv } from 'dotenv';
import { fetchApiInventory } from './lib/api-inventory';
import {
  DEFAULT_ADMIN_URL,
  DEFAULT_STORE_URL,
  bilanPath,
  exportRoot,
  manifestPath,
} from './lib/config';
import { runBrowserExport } from './lib/browser-export';
import { ensureDir, writeJson } from './lib/fs-utils';
import { formatBilanText, recomputeBilan } from './lib/manifest';
import type { TeachizyExportManifest } from './lib/types';

loadEnv({ path: '.env.local' });

function argValue(args: string[], name: string): string | undefined {
  const i = args.indexOf(name);
  if (i >= 0) {
    const parts: string[] = [];
    for (let j = i + 1; j < args.length; j++) {
      if (args[j].startsWith('-')) break;
      parts.push(args[j]);
    }
    if (parts.length) return parts.join(' ');
  }
  const pref = `${name}=`;
  const hit = args.find((a) => a.startsWith(pref));
  return hit ? hit.slice(pref.length) : undefined;
}

function hasFlag(args: string[], name: string): boolean {
  return args.includes(name);
}

async function main() {
  const args = process.argv.slice(2);

  if (hasFlag(args, '--help') || hasFlag(args, '-h')) {
    console.log(`Export PDF Teachizy

Options :
  --inventory              Inventaire seul (pas de téléchargement)
  --formation <titre>      Filtrer une formation (correspondance partielle)
  --max-formations <n>     Nombre de formations (défaut : 1)
  --all                    Toutes les formations (après validation d’une première)
  --login                  Forcer une nouvelle connexion (ignore la session locale)
  --admin-url <url>        Console admin (défaut : ${DEFAULT_ADMIN_URL})
  --store-url <url>        Espace apprenant (défaut : ${DEFAULT_STORE_URL})
  --headed / --headless    Navigateur visible (défaut) ou non

Variables optionnelles (.env.local) :
  TEACHIZY_API_KEY         Clé API officielle (structure formations/leçons uniquement — pas les PDF)
  TEACHIZY_ADMIN_URL
  TEACHIZY_STORE_URL
`);
    return;
  }

  const inventoryOnly = hasFlag(args, '--inventory');
  const forceLogin = hasFlag(args, '--login');
  const all = hasFlag(args, '--all');
  const formationFilter = argValue(args, '--formation');
  const maxFormations = all
    ? 999
    : Number(argValue(args, '--max-formations') ?? '1') || 1;
  const headed = !hasFlag(args, '--headless');
  const adminUrl =
    argValue(args, '--admin-url') ||
    process.env.TEACHIZY_ADMIN_URL ||
    DEFAULT_ADMIN_URL;
  const storeUrl =
    argValue(args, '--store-url') ||
    process.env.TEACHIZY_STORE_URL ||
    DEFAULT_STORE_URL;

  if (forceLogin) {
    const state = `${process.cwd()}/.teachizy-auth/storage-state.json`;
    if (fs.existsSync(state)) fs.unlinkSync(state);
    console.log('Session locale effacée — nouvelle connexion requise.');
  }

  ensureDir(exportRoot());

  let seed;
  const apiKey = process.env.TEACHIZY_API_KEY?.trim();
  if (apiKey) {
    console.log('Inventaire structurel via API officielle Teachizy (sans PDF)…');
    try {
      seed = await fetchApiInventory(apiKey);
      console.log(`API : ${seed.length} formation(s) listée(s).`);
    } catch (e) {
      console.warn(
        'API indisponible ou clé invalide — poursuite via navigateur uniquement.',
        e instanceof Error ? e.message : e
      );
    }
  } else {
    console.log(
      'Pas de TEACHIZY_API_KEY — inventaire via navigateur (l’API publique ne fournit de toute façon pas les PDF).'
    );
  }

  console.log(`\nAdmin : ${adminUrl}`);
  console.log(`Store : ${storeUrl}`);
  console.log(
    `Mode : ${inventoryOnly ? 'inventaire' : 'téléchargement'} | max formations : ${maxFormations}`
  );

  const formations = await runBrowserExport(
    {
      adminUrl,
      storeUrl,
      inventoryOnly,
      formationFilter,
      maxFormations,
      headed,
    },
    seed
  );

  const manifest: TeachizyExportManifest = {
    version: 2,
    generatedAt: new Date().toISOString(),
    storeUrl,
    adminUrl,
    inventoryOnly,
    formations,
    bilan: recomputeBilan(formations),
  };

  writeJson(manifestPath(), manifest);
  fs.writeFileSync(bilanPath(), formatBilanText(manifest), 'utf8');

  // Index global des liens (pratique)
  const allLinks: Array<Record<string, unknown>> = [];
  for (const f of formations) {
    for (const mod of [...f.modules, { title: 'racine', lessons: f.rootLessons }]) {
      for (const lesson of mod.lessons) {
        const assets = lesson.assets?.length ? lesson.assets : lesson.pdfs ?? [];
        for (const a of assets) {
          if (a.kind === 'link' && a.sourceUrlSafe) {
            allLinks.push({
              formation: f.title,
              module: 'title' in mod ? mod.title : 'racine',
              lesson: lesson.title,
              title: a.originalTitle,
              url: a.sourceUrlSafe,
              host: a.linkHost ?? null,
            });
          }
        }
      }
    }
  }
  writeJson(path.join(exportRoot(), 'tous-les-liens.json'), allLinks);

  console.log('\n' + formatBilanText(manifest));
  console.log(`Manifeste : ${manifestPath()}`);
  console.log(`Bilan     : ${bilanPath()}`);
  console.log(`Liens     : ${path.join(exportRoot(), 'tous-les-liens.json')} (${allLinks.length})`);
  console.log(`Fichiers  : ${exportRoot()}/<formation>/…`);
  console.log('\nRelancer : npm run teachizy:export -- --formation "…"');
  console.log('Import simulation : npm run teachizy:prepare-import');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
