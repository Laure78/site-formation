import type { SupabaseClient } from '@supabase/supabase-js';
import { FORMATIONS_CATALOGUE, type FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import { enrollUserByEmail } from '@/lib/lms-auto-enroll';
import { tarifHtDepuisBadgeCatalogue } from '@/lib/tarifs-sessions';

const PREREQUIS_DEFAUT =
  'Ordinateur portable + connexion internet. Aucune compétence technique préalable. Comptes IA (ChatGPT / Claude) recommandés.';

function catalogueLevelToLms(level: FormationCatalogueEntry['level']): 'débutant' | 'avance' {
  return level === 'DÉBUTANT' ? 'débutant' : 'avance';
}

function parseDurationHours(duree: string): number {
  const m = duree.match(/(\d+)\s*h/i);
  return m ? Number(m[1]) : 4;
}

function coursePayload(entry: FormationCatalogueEntry) {
  return {
    slug: entry.slug,
    title: entry.title,
    description: `${entry.pitch} ${entry.ref} — ${entry.comparatif.publicLabel}. Qualiopi — financement OPCO possible selon éligibilité.`,
    objectifs: entry.objectifs.join(' · '),
    prerequis: PREREQUIS_DEFAUT,
    programme: `Parcours catalogue ${entry.ref} · ${entry.duree} · ${entry.effectif}. Programme PDF : ${entry.programmePdfHref}`,
    price: tarifHtDepuisBadgeCatalogue(entry.level),
    published: true,
    duration_hours: parseDurationHours(entry.duree),
    level: catalogueLevelToLms(entry.level),
    category: 'formation-ia-btp',
    image_url: entry.visuel.src,
  };
}

export type SyncCatalogueResult = {
  slug: string;
  ref: string;
  title: string;
  action: 'created' | 'updated';
  courseId: string;
};

/**
 * Crée ou met à jour un cours LMS pour chaque formation du catalogue `/formations`
 * (NIV-01 → NIV-05). Ne détruit pas les modules/leçons existants.
 */
export async function syncCatalogueFormationsToLms(
  supabase: SupabaseClient,
  options?: { creatorId?: string | null },
): Promise<{ results: SyncCatalogueResult[]; errors: string[] }> {
  const results: SyncCatalogueResult[] = [];
  const errors: string[] = [];

  for (const entry of FORMATIONS_CATALOGUE) {
    try {
      const payload = coursePayload(entry);
      const { data: existing } = await supabase
        .from('courses')
        .select('id')
        .eq('slug', entry.slug)
        .maybeSingle();

      if (existing?.id) {
        const { error } = await supabase
          .from('courses')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', existing.id);
        if (error) throw error;
        await enrollUserByEmail(supabase, existing.id);
        results.push({
          slug: entry.slug,
          ref: entry.ref,
          title: entry.title,
          action: 'updated',
          courseId: existing.id,
        });
        continue;
      }

      const insertPayload = {
        ...payload,
        ...(options?.creatorId ? { creator_id: options.creatorId } : {}),
      };

      const { data: created, error } = await supabase
        .from('courses')
        .insert(insertPayload)
        .select('id')
        .single();
      if (error || !created) throw new Error(error?.message ?? 'Insert échoué');

      // Module programme PDF de base (uniquement à la création)
      const { data: mod, error: modErr } = await supabase
        .from('modules')
        .insert({
          course_id: created.id,
          title: 'Programme & ressources',
          order_index: 0,
        })
        .select('id')
        .single();
      if (modErr || !mod) throw new Error(modErr?.message ?? 'Module échoué');

      const { error: lesErr } = await supabase.from('lessons').insert([
        {
          module_id: mod.id,
          title: `Programme officiel ${entry.ref} (PDF)`,
          type: 'pdf',
          content_url: entry.programmePdfHref,
          order_index: 0,
          duration_minutes: 15,
        },
        {
          module_id: mod.id,
          title: 'Objectifs et public',
          type: 'texte',
          content_text: `<p><strong>${entry.ref}</strong> — ${entry.level}</p><p>${entry.pitch}</p><p><strong>Public :</strong> ${entry.comparatif.publicLabel}</p><p><strong>Cas d'usage :</strong> ${entry.comparatif.casUsage}</p><ul>${entry.objectifs.map((o) => `<li>${o}</li>`).join('')}</ul>`,
          order_index: 1,
          duration_minutes: 10,
        },
      ]);
      if (lesErr) throw new Error(lesErr.message);

      await enrollUserByEmail(supabase, created.id);

      results.push({
        slug: entry.slug,
        ref: entry.ref,
        title: entry.title,
        action: 'created',
        courseId: created.id,
      });
    } catch (e) {
      errors.push(
        `${entry.ref} (${entry.slug}) : ${e instanceof Error ? e.message : 'erreur'}`,
      );
    }
  }

  return { results, errors };
}
