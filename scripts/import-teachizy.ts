#!/usr/bin/env npx tsx
/**
 * Script d'import des contenus Teachizy vers la plateforme LMS
 *
 * Usage: npm run import:teachizy
 *
 * Prérequis:
 * - SUPABASE_SERVICE_ROLE_KEY et NEXT_PUBLIC_SUPABASE_URL dans .env.local
 * - PDFs placés dans /public/formations/btp/
 * - Formation "L'IA au service du bâtiment" (slug: ia-au-service-du-btp) avec ses modules
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import { TEACHIZY_IMPORT_CONFIG } from './import-teachizy-config';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const COURSE_SLUG = 'ia-au-service-du-btp';
const PDF_BASE_PATH = '/formations/btp/';

function slugFromFilename(filename: string): string {
  return filename.replace(/\.pdf$/i, '').replace(/\s+/g, '-');
}

async function main() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY manquant dans .env.local');
    process.exit(1);
  }

  console.log('Import Teachizy — Formation L\'IA au service du bâtiment\n');

  const { data: course, error: courseErr } = await supabase
    .from('courses')
    .select('id')
    .eq('slug', COURSE_SLUG)
    .single();

  if (courseErr || !course) {
    console.error('Cours non trouvé. Exécutez seed_formations.sql si besoin.');
    process.exit(1);
  }

  const { data: modules } = await supabase
    .from('modules')
    .select('id, title')
    .eq('course_id', course.id)
    .order('order_index');

  const moduleByTitle: Record<string, { id: string }> = {};
  for (const m of modules ?? []) {
    moduleByTitle[m.title] = { id: m.id };
  }

  for (const config of TEACHIZY_IMPORT_CONFIG) {
    const mod = moduleByTitle[config.moduleTitle];
    if (!mod) {
      console.warn(`Module non trouvé: ${config.moduleTitle}`);
      continue;
    }

    // Créer ou récupérer la leçon (1 leçon par module)
    let { data: lessons } = await supabase
      .from('lessons')
      .select('id, content_url')
      .eq('module_id', mod.id);

    let lessonId: string;
    // content_url seulement si 1 seul PDF (sinon les onglets du CourseViewer ne s'affichent pas)
    const contentUrl = config.pdfs.length === 1 ? `${PDF_BASE_PATH}${config.pdfs[0]}` : null;

    if (!lessons || lessons.length === 0) {
      const { data: created, error: createErr } = await supabase
        .from('lessons')
        .insert({
          module_id: mod.id,
          title: config.moduleTitle,
          type: 'pdf',
          content_url: contentUrl,
          order_index: 0,
        })
        .select('id')
        .single();

      if (createErr) {
        console.error(`Erreur création leçon "${config.moduleTitle}":`, createErr.message);
        continue;
      }
      lessonId = created!.id;
      console.log(`Créé : leçon "${config.moduleTitle}"`);
    } else {
      lessonId = lessons[0].id;
      if (contentUrl && !lessons[0].content_url) {
        await supabase.from('lessons').update({ content_url: contentUrl, type: 'pdf' }).eq('id', lessonId);
      }
    }

    // Supprimer les anciennes ressources puis insérer les nouvelles
    await supabase.from('lesson_resources').delete().eq('lesson_id', lessonId);

    let orderIdx = 0;

    for (const pdf of config.pdfs) {
      const fileUrl = `${PDF_BASE_PATH}${pdf}`;
      const title = pdf.replace(/\.pdf$/i, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const { error } = await supabase.from('lesson_resources').insert({
        lesson_id: lessonId,
        title,
        file_url: fileUrl,
        file_type: 'pdf',
        order_index: orderIdx++,
      });
      if (error) console.error(`Erreur ressource PDF ${pdf}:`, error.message);
      else console.log(`  + PDF: ${pdf}`);
    }

    for (const link of config.links) {
      const title = link.title ?? new URL(link.url).hostname.replace(/^www\./, '');
      const { error } = await supabase.from('lesson_resources').insert({
        lesson_id: lessonId,
        title,
        file_url: link.url,
        file_type: 'link',
        order_index: orderIdx++,
      });
      if (error) console.error(`Erreur lien ${link.url}:`, error.message);
      else console.log(`  + Lien: ${title}`);
    }

    console.log('');
  }

  console.log('Import terminé.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
