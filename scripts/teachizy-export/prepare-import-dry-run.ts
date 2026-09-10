#!/usr/bin/env npx tsx
/**
 * Prépare l’import des supports Teachizy vers la plateforme LMS (mode simulation par défaut).
 *
 * - Lit teachizy-export/manifest.json (PDF, Excel, liens)
 * - Propose la copie vers public/formations/<slug>/
 * - Propose un brouillon de config (pdfs + links)
 * - N’écrit PAS en base et ne remplace PAS de fichiers sans --apply-files
 */

import fs from 'node:fs';
import path from 'node:path';
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { exportRoot, manifestPath, projectRoot } from './lib/config';
import { ensureDir, readJson, writeJson } from './lib/fs-utils';
import { slugify } from './lib/slug';
import type { TeachizyAsset, TeachizyExportManifest, TeachizyFormation, TeachizyLesson } from './lib/types';

loadEnv({ path: '.env.local' });

interface PlannedAction {
  type: 'copy_file' | 'create_lesson' | 'create_resource' | 'create_link' | 'skip_existing' | 'warn';
  detail: string;
}

function publicFormationDir(formationSlug: string): string {
  return path.join(projectRoot(), 'public', 'formations', formationSlug);
}

function lessonAssets(lesson: TeachizyLesson): TeachizyAsset[] {
  return lesson.assets?.length ? lesson.assets : lesson.pdfs ?? [];
}

function isReadyFile(asset: TeachizyAsset): boolean {
  return (
    (asset.status === 'downloaded' || asset.status === 'skipped_duplicate') &&
    !!asset.localPath &&
    (asset.kind === 'pdf' || asset.kind === 'xlsx' || asset.kind === 'xls' || asset.kind === 'file')
  );
}

function planFormation(formation: TeachizyFormation): {
  slug: string;
  actions: PlannedAction[];
  configDraft: {
    moduleTitle: string;
    pdfs: string[];
    files: string[];
    links: { url: string; title?: string }[];
  }[];
} {
  const slug = slugify(formation.title);
  const actions: PlannedAction[] = [];
  const configDraft: {
    moduleTitle: string;
    pdfs: string[];
    files: string[];
    links: { url: string; title?: string }[];
  }[] = [];
  const targetRoot = publicFormationDir(slug);

  const modules =
    formation.modules.length > 0
      ? formation.modules
      : [
          {
            sourceId: 'root',
            title: 'Contenu',
            order: 1,
            lessons: formation.rootLessons,
          },
        ];

  for (const mod of modules) {
    const pdfs: string[] = [];
    const files: string[] = [];
    const links: { url: string; title?: string }[] = [];

    for (const lesson of mod.lessons) {
      for (const asset of lessonAssets(lesson)) {
        if (asset.kind === 'link') {
          if (asset.status === 'recorded' && asset.sourceUrlSafe) {
            links.push({ url: asset.sourceUrlSafe, title: asset.originalTitle });
            actions.push({
              type: 'create_link',
              detail: `Leçon « ${lesson.title} » ← ${asset.originalTitle} (${asset.sourceUrlSafe})`,
            });
          } else {
            actions.push({
              type: 'warn',
              detail: `Lien non prêt « ${asset.originalTitle} » (${asset.status}${asset.error ? `: ${asset.error}` : ''})`,
            });
          }
          continue;
        }

        if (!isReadyFile(asset)) {
          actions.push({
            type: 'warn',
            detail: `Fichier non prêt « ${asset.originalTitle} » (${asset.status}${asset.error ? `: ${asset.error}` : ''})`,
          });
          continue;
        }

        const src = path.join(exportRoot(), asset.localPath!);
        const fileName = path.basename(asset.localPath!);
        const dest = path.join(targetRoot, fileName);
        if (fs.existsSync(dest)) {
          actions.push({
            type: 'skip_existing',
            detail: `Existe déjà (aucun écrasement) : public/formations/${slug}/${fileName}`,
          });
        } else {
          actions.push({
            type: 'copy_file',
            detail: `${asset.localPath} → public/formations/${slug}/${fileName}`,
          });
        }
        if (asset.kind === 'pdf') pdfs.push(fileName);
        else files.push(fileName);
        actions.push({
          type: 'create_resource',
          detail: `Leçon « ${lesson.title} » (module « ${mod.title} ») ← /formations/${slug}/${fileName} [${asset.kind}]`,
        });
      }
    }

    if (pdfs.length || files.length || links.length) {
      configDraft.push({ moduleTitle: mod.title, pdfs, files, links });
      actions.push({
        type: 'create_lesson',
        detail: `Module « ${mod.title} » — ${pdfs.length} PDF, ${files.length} fichier(s), ${links.length} lien(s)`,
      });
    }
  }

  return { slug, actions, configDraft };
}

async function compareSupabase(formationTitle: string, slug: string): Promise<string[]> {
  const notes: string[] = [];
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    notes.push('Supabase non configuré (.env.local) — comparaison BDD ignorée.');
    return notes;
  }

  const supabase = createClient(url, key);
  const { data: courses } = await supabase.from('courses').select('id, title, slug').limit(200);
  const match =
    courses?.find((c) => c.slug === slug) ||
    courses?.find((c) => c.title.toLowerCase() === formationTitle.toLowerCase()) ||
    courses?.find((c) => c.title.toLowerCase().includes(formationTitle.toLowerCase().slice(0, 20)));

  if (!match) {
    notes.push(
      `Aucun cours LMS correspondant à « ${formationTitle} » (slug proposé : ${slug}). Création manuelle ou seed requis avant import.`
    );
    return notes;
  }

  notes.push(`Cours LMS trouvé : « ${match.title} » (slug ${match.slug}).`);
  const { data: modules } = await supabase
    .from('modules')
    .select('id, title, order_index')
    .eq('course_id', match.id)
    .order('order_index');

  for (const m of modules ?? []) {
    const { count } = await supabase
      .from('lessons')
      .select('id', { count: 'exact', head: true })
      .eq('module_id', m.id);
    notes.push(`  Module existant « ${m.title} » — ${count ?? 0} leçon(s). Aucune modification sans validation.`);
  }

  notes.push(
    'Les ressources apprenants restent protégées par RLS (inscription / admin) — pas de lien Teachizy dans le plan.'
  );
  return notes;
}

async function main() {
  const args = process.argv.slice(2);
  const applyFiles = args.includes('--apply-files');

  const manifest = readJson<TeachizyExportManifest>(manifestPath());
  if (!manifest) {
    console.error(`Manifeste introuvable : ${manifestPath()}`);
    console.error('Lancez d’abord : npm run teachizy:export');
    process.exit(1);
  }

  console.log('=== Préparation import Teachizy (SIMULATION) ===\n');
  console.log(`Manifeste : ${manifest.generatedAt}`);
  console.log(`Formations : ${manifest.formations.length}\n`);

  const allDrafts: Record<string, unknown> = {};
  const report: string[] = [];

  for (const formation of manifest.formations) {
    console.log(`— ${formation.title}`);
    const plan = planFormation(formation);
    allDrafts[plan.slug] = {
      formationTitle: formation.title,
      sourceId: formation.sourceId,
      publicDir: `/formations/${plan.slug}/`,
      modules: plan.configDraft,
    };

    for (const a of plan.actions) {
      const prefix =
        a.type === 'warn'
          ? '⚠'
          : a.type === 'skip_existing'
            ? '·'
            : a.type === 'copy_file'
              ? '→'
              : a.type === 'create_link'
                ? '↗'
                : '+';
      console.log(`  ${prefix} [${a.type}] ${a.detail}`);
      report.push(`[${formation.title}] ${a.type}: ${a.detail}`);
    }

    const notes = await compareSupabase(formation.title, plan.slug);
    for (const n of notes) {
      console.log(`  i ${n}`);
      report.push(`[${formation.title}] note: ${n}`);
    }

    if (applyFiles) {
      const destRoot = publicFormationDir(plan.slug);
      ensureDir(destRoot);
      for (const a of plan.actions.filter((x) => x.type === 'copy_file')) {
        const m = a.detail.match(/^(.+) → public\/formations\/[^/]+\/(.+)$/);
        if (!m) continue;
        const src = path.join(exportRoot(), m[1]);
        const dest = path.join(destRoot, m[2]);
        if (!fs.existsSync(src)) {
          console.warn(`  Fichier source manquant : ${src}`);
          continue;
        }
        if (fs.existsSync(dest)) {
          console.log(`  Skip (existe) : ${dest}`);
          continue;
        }
        fs.copyFileSync(src, dest);
        console.log(`  Copié : ${dest}`);
      }
    }

    console.log('');
  }

  const outDir = path.join(exportRoot(), 'import-prep');
  ensureDir(outDir);
  writeJson(path.join(outDir, 'config-draft.json'), allDrafts);
  fs.writeFileSync(path.join(outDir, 'simulation-report.txt'), report.join('\n') + '\n', 'utf8');

  console.log('Aucune écriture BDD effectuée.');
  console.log(`Brouillon config : ${path.join(outDir, 'config-draft.json')}`);
  console.log(`Rapport          : ${path.join(outDir, 'simulation-report.txt')}`);
  if (!applyFiles) {
    console.log('\nPour copier les fichiers vers public/formations/… (sans écraser) :');
    console.log('  npm run teachizy:prepare-import -- --apply-files');
  }
  console.log('\nImport LMS production : valider le brouillon puis utiliser / adapter npm run import:teachizy (non lancé ici).');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
