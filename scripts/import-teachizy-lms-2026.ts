#!/usr/bin/env npx tsx
/**
 * Import LMS multi-formations depuis teachizy-export/manifest.json
 * → courses / modules / lessons / lesson_resources (PDF, Excel, liens).
 *
 * Usage :
 *   npx tsx scripts/import-teachizy-lms-2026.ts --dry-run
 *   npx tsx scripts/import-teachizy-lms-2026.ts --apply
 *
 * Filtre : formations IA / BTP actuelles (exclut archives création d’entreprise 2021-2022).
 * Idempotent : ne recrée pas un module/leçon au même titre ; ajoute les ressources manquantes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { exportRoot, manifestPath, projectRoot } from './teachizy-export/lib/config';
import { readJson } from './teachizy-export/lib/fs-utils';
import { slugify } from './teachizy-export/lib/slug';
import type {
  TeachizyAsset,
  TeachizyExportManifest,
  TeachizyFormation,
  TeachizyLesson,
} from './teachizy-export/lib/types';

loadEnv({ path: '.env.local' });

const ARCHIVE_RE =
  /2021|2022|création d.entreprise|creation d.entreprise|masterclass|prospection facile|naturopathe|micro entreprise|statut juridique|business plan|premiers clients|etre visible|communiquer efficacement|trouver votre projet/i;

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

function isReadyLink(asset: TeachizyAsset): boolean {
  return asset.kind === 'link' && asset.status === 'recorded' && !!asset.sourceUrlSafe;
}

function publicUrlForAsset(asset: TeachizyAsset, formationSlug: string): string | null {
  if (!asset.localPath) return null;
  const fileName = path.basename(asset.localPath);
  const dest = path.join(projectRoot(), 'public', 'formations', formationSlug, fileName);
  if (!fs.existsSync(dest)) {
    // tenter copie depuis export
    const src = path.join(exportRoot(), asset.localPath);
    if (!fs.existsSync(src)) return null;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
  return `/formations/${formationSlug}/${fileName}`;
}

function formationHasContent(f: TeachizyFormation): boolean {
  const modules =
    f.modules?.length > 0
      ? f.modules
      : [{ title: 'Contenu', lessons: f.rootLessons ?? [], order: 0, sourceId: 'root' }];
  for (const mod of modules) {
    for (const lesson of mod.lessons ?? []) {
      for (const a of lessonAssets(lesson)) {
        if (isReadyFile(a) || isReadyLink(a)) return true;
      }
    }
  }
  return false;
}

function shouldImport(f: TeachizyFormation): boolean {
  if (ARCHIVE_RE.test(f.title)) return false;
  return formationHasContent(f);
}

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');
  const dryRun = !apply || args.includes('--dry-run');

  const manifest = readJson<TeachizyExportManifest>(manifestPath());
  if (!manifest) {
    console.error(`Manifeste introuvable : ${manifestPath()}`);
    process.exit(1);
  }

  const targets = manifest.formations.filter(shouldImport);
  console.log(`Manifeste ${manifest.generatedAt}`);
  console.log(`Formations à importer : ${targets.length} / ${manifest.formations.length}\n`);

  if (dryRun && !apply) {
    for (const f of targets) {
      const slug = slugify(f.title);
      const modules =
        f.modules?.length > 0
          ? f.modules
          : [{ title: 'Contenu', lessons: f.rootLessons ?? [], order: 0, sourceId: 'root' }];
      let pdf = 0,
        xls = 0,
        links = 0;
      for (const mod of modules) {
        for (const lesson of mod.lessons ?? []) {
          for (const a of lessonAssets(lesson)) {
            if (a.kind === 'pdf' && isReadyFile(a)) pdf++;
            if ((a.kind === 'xlsx' || a.kind === 'xls') && isReadyFile(a)) xls++;
            if (isReadyLink(a)) links++;
          }
        }
      }
      console.log(
        `• ${f.title}\n  slug=${slug} | modules=${modules.length} | PDF=${pdf} | Excel=${xls} | liens=${links}`
      );
      for (const mod of modules) {
        console.log(`    — ${mod.title} (${(mod.lessons ?? []).length} leçon(s))`);
        for (const lesson of mod.lessons ?? []) {
          const kinds = lessonAssets(lesson)
            .filter((a) => isReadyFile(a) || isReadyLink(a))
            .map((a) => a.kind)
            .join(',');
          if (kinds) console.log(`       · ${lesson.title} [${kinds}]`);
        }
      }
      console.log('');
    }
    console.log('Dry-run terminé. Pour écrire en BDD :');
    console.log('  npx tsx scripts/import-teachizy-lms-2026.ts --apply');
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_URL manquants.');
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('role', 'admin')
    .limit(1)
    .maybeSingle();

  let createdCourses = 0;
  let updatedCourses = 0;
  let createdModules = 0;
  let createdLessons = 0;
  let createdResources = 0;

  for (const f of targets) {
    const slug = slugify(f.title);
    console.log(`\n=== ${f.title} ===`);

    const { data: existing } = await supabase
      .from('courses')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    let courseId: string;
    if (existing?.id) {
      courseId = existing.id;
      await supabase
        .from('courses')
        .update({
          title: f.title,
          description: `Import Teachizy 2026 — supports PDF, Excel et liens. Source : ${f.sourceId}`,
          category: 'teachizy-2026',
          updated_at: new Date().toISOString(),
        })
        .eq('id', courseId);
      updatedCourses++;
      console.log(`  Cours existant mis à jour (${slug})`);
    } else {
      const { data: created, error } = await supabase
        .from('courses')
        .insert({
          slug,
          title: f.title,
          description: `Import Teachizy 2026 — supports PDF, Excel et liens. Source : ${f.sourceId}`,
          published: true,
          price: 0,
          category: 'teachizy-2026',
          duration_hours: 4,
          level: 'débutant',
          ...(adminProfile?.id ? { creator_id: adminProfile.id } : {}),
        })
        .select('id')
        .single();
      if (error || !created) {
        console.error(`  Échec création cours : ${error?.message}`);
        continue;
      }
      courseId = created.id;
      createdCourses++;
      console.log(`  Cours créé (${slug})`);
    }

    const modules =
      f.modules?.length > 0
        ? f.modules
        : [{ title: 'Contenu', lessons: f.rootLessons ?? [], order: 0, sourceId: 'root' }];

    const { data: existingModules } = await supabase
      .from('modules')
      .select('id, title')
      .eq('course_id', courseId);

    const moduleByTitle = new Map(
      (existingModules ?? []).map((m) => [m.title.trim().toLowerCase(), m.id])
    );

    for (let mi = 0; mi < modules.length; mi++) {
      const mod = modules[mi]!;
      const modKey = mod.title.trim().toLowerCase();
      let moduleId = moduleByTitle.get(modKey);
      if (!moduleId) {
        const { data: createdMod, error: modErr } = await supabase
          .from('modules')
          .insert({
            course_id: courseId,
            title: mod.title,
            order_index: mod.order ?? mi,
          })
          .select('id')
          .single();
        if (modErr || !createdMod) {
          console.error(`  Module « ${mod.title} » : ${modErr?.message}`);
          continue;
        }
        moduleId = createdMod.id;
        moduleByTitle.set(modKey, moduleId);
        createdModules++;
        console.log(`  + Module « ${mod.title} »`);
      }

      const { data: existingLessons } = await supabase
        .from('lessons')
        .select('id, title')
        .eq('module_id', moduleId);

      const lessonByTitle = new Map(
        (existingLessons ?? []).map((l) => [l.title.trim().toLowerCase(), l.id])
      );

      const lessons = mod.lessons ?? [];
      for (let li = 0; li < lessons.length; li++) {
        const lesson = lessons[li]!;
        const assets = lessonAssets(lesson).filter((a) => isReadyFile(a) || isReadyLink(a));
        if (assets.length === 0) continue;

        const pdfs = assets.filter((a) => a.kind === 'pdf' && isReadyFile(a));
        const firstPdfUrl =
          pdfs.length === 1 ? publicUrlForAsset(pdfs[0]!, slug) : null;

        const lessonKey = lesson.title.trim().toLowerCase();
        let lessonId = lessonByTitle.get(lessonKey);
        if (!lessonId) {
          const { data: createdLesson, error: lesErr } = await supabase
            .from('lessons')
            .insert({
              module_id: moduleId,
              title: lesson.title,
              type: pdfs.length > 0 ? 'pdf' : 'texte',
              content_url: firstPdfUrl,
              content_text:
                pdfs.length === 0
                  ? `Supports Teachizy — ${assets.length} ressource(s)`
                  : null,
              order_index: lesson.order ?? li,
            })
            .select('id')
            .single();
          if (lesErr || !createdLesson) {
            console.error(`    Leçon « ${lesson.title} » : ${lesErr?.message}`);
            continue;
          }
          lessonId = createdLesson.id;
          lessonByTitle.set(lessonKey, lessonId);
          createdLessons++;
          console.log(`    + Leçon « ${lesson.title} »`);
        }

        const { data: existingRes } = await supabase
          .from('lesson_resources')
          .select('id, file_url')
          .eq('lesson_id', lessonId);
        const urls = new Set((existingRes ?? []).map((r) => r.file_url));

        let orderIdx = existingRes?.length ?? 0;
        for (const asset of assets) {
          let fileUrl: string | null = null;
          let fileType = asset.kind;
          let title = asset.originalTitle || asset.kind;

          if (asset.kind === 'link') {
            fileUrl = asset.sourceUrlSafe;
            fileType = 'link';
            title = asset.linkCaption || asset.originalTitle || asset.linkHost || 'Lien';
          } else {
            fileUrl = publicUrlForAsset(asset, slug);
            if (!fileUrl) {
              console.warn(`    Fichier manquant : ${asset.localPath}`);
              continue;
            }
          }

          if (!fileUrl || urls.has(fileUrl)) continue;

          const { error: resErr } = await supabase.from('lesson_resources').insert({
            lesson_id: lessonId,
            title,
            file_url: fileUrl,
            file_type: fileType,
            order_index: orderIdx++,
          });
          if (resErr) {
            console.error(`    Ressource ${title}: ${resErr.message}`);
          } else {
            urls.add(fileUrl);
            createdResources++;
            console.log(`      + [${fileType}] ${title}`);
          }
        }
      }
    }
  }

  console.log('\n=== Bilan ===');
  console.log(`Cours créés     : ${createdCourses}`);
  console.log(`Cours mis à jour: ${updatedCourses}`);
  console.log(`Modules créés   : ${createdModules}`);
  console.log(`Leçons créées   : ${createdLessons}`);
  console.log(`Ressources +    : ${createdResources}`);
  console.log('\nVoir https://www.laureolivie.fr/admin/formations (filtre catégorie teachizy-2026 / non publiées).');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
