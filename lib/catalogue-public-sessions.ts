/**
 * Sessions inter publiques — source `courses` (LMS) lorsqu’une date est renseignée.
 * Aucune donnée inventée (lieu, places) : uniquement ce qui est en base.
 */
import { createClient } from '@/lib/supabase/server';

export type CataloguePublicSession = {
  courseId: string;
  slug: string;
  title: string;
  /** Date de fin de session telle qu’enregistrée (ISO date). */
  sessionEndsOn: string;
};

export async function getCataloguePublicSessionsForSlug(
  slug: string,
): Promise<CataloguePublicSession[]> {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from('courses')
    .select('id, slug, title, session_ends_on, session_cancelled')
    .eq('slug', slug)
    .eq('published', true)
    .eq('session_cancelled', false)
    .not('session_ends_on', 'is', null)
    .gte('session_ends_on', today)
    .order('session_ends_on', { ascending: true });

  if (error || !data?.length) return [];

  return data
    .filter((row) => row.session_ends_on)
    .map((row) => ({
      courseId: row.id as string,
      slug: row.slug as string,
      title: row.title as string,
      sessionEndsOn: row.session_ends_on as string,
    }));
}

export function formatSessionDateFr(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return isoDate;
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(y, m - 1, d));
}
