/**
 * Sessions publiques /dates-et-lieux — training_ops (vue catalogue) + reliquat LMS (courses).
 */
import {
  formationHref,
  getFormationByCode,
  libelleDureeFormation,
} from '@/data/formations';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { datesLieuxNiveauFilterLabel } from '@/lib/dates-lieux/niveau';
import type { DatesLieuxOnDemandRow, DatesLieuxSessionRow } from '@/lib/dates-lieux/types';

type TrainingPublicRow = {
  id: string;
  starts_on: string;
  ends_on: string | null;
  schedule_text: string | null;
  location_city: string | null;
  location_address: string | null;
  department_code: string | null;
  max_participants: number | null;
  catalogue_code: string | null;
  program_slug: string | null;
  enrolled_count: number | null;
};

function mapFormationToSessionBase(
  code: string,
  sessionDate: string,
  extra: Omit<
    DatesLieuxSessionRow,
    | 'formationSlug'
    | 'formationCode'
    | 'formationTitle'
    | 'formationHref'
    | 'niveau'
    | 'niveauLabel'
    | 'dureeLabel'
    | 'tarifParticipantHt'
    | 'sessionDate'
  >,
): DatesLieuxSessionRow | null {
  const formation = getFormationByCode(code);
  if (!formation) return null;
  const tarif = formation.tarifParticipantHt ?? 0;
  return {
    formationSlug: formation.slug,
    formationCode: formation.code,
    formationTitle: formation.titre,
    formationHref: formationHref(formation),
    niveau: formation.niveau,
    niveauLabel: datesLieuxNiveauFilterLabel(formation.niveau),
    dureeLabel: libelleDureeFormation(formation),
    tarifParticipantHt: tarif,
    sessionDate,
    ...extra,
  };
}

async function loadTrainingOpsPublicSessions(): Promise<DatesLieuxSessionRow[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('training_sessions_catalogue_public')
      .select('*')
      .order('starts_on', { ascending: true });

    if (error) {
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        return [];
      }
      console.error('[dates-lieux] training_sessions_catalogue_public', error.message);
      return [];
    }

    const rows: DatesLieuxSessionRow[] = [];
    for (const raw of (data ?? []) as TrainingPublicRow[]) {
      const code = raw.catalogue_code?.trim();
      if (!code) continue;
      const dateIso = raw.starts_on;
      const enrolled = raw.enrolled_count ?? 0;
      const max = raw.max_participants;
      const isFull = max != null && max > 0 && enrolled >= max;
      const mapped = mapFormationToSessionBase(code, dateIso, {
        id: `ops-${raw.id}`,
        source: 'training_ops',
        scheduleText: raw.schedule_text,
        city: raw.location_city,
        departmentCode: raw.department_code,
        address: raw.location_address,
        maxParticipants: max,
        enrolledCount: enrolled,
        isFull,
        trainingSessionId: raw.id,
      });
      if (mapped) rows.push(mapped);
    }
    return rows;
  } catch (e) {
    console.error('[dates-lieux] training ops load', e);
    return [];
  }
}

async function loadLmsCourseSessions(): Promise<DatesLieuxSessionRow[]> {
  const today = new Date().toISOString().slice(0, 10);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('courses')
    .select('id, slug, title, session_ends_on, session_cancelled')
    .eq('published', true)
    .eq('session_cancelled', false)
    .not('session_ends_on', 'is', null)
    .gte('session_ends_on', today)
    .order('session_ends_on', { ascending: true });

  if (error || !data?.length) return [];

  const rows: DatesLieuxSessionRow[] = [];
  for (const course of data) {
    const slug = String(course.slug);
    const formation = getPublishedFormations().find((f) => f.slug === slug);
    if (!formation) continue;
    const dateIso = String(course.session_ends_on);
    rows.push({
      id: `lms-${course.id}`,
      source: 'course_lms',
      formationSlug: formation.slug,
      formationCode: formation.code,
      formationTitle: formation.titre,
      formationHref: formationHref(formation),
      niveau: formation.niveau,
      niveauLabel: datesLieuxNiveauFilterLabel(formation.niveau),
      dureeLabel: libelleDureeFormation(formation),
      tarifParticipantHt: formation.tarifParticipantHt ?? 0,
      sessionDate: dateIso,
      scheduleText: formation.horaires ?? null,
      city: null,
      departmentCode: null,
      address: null,
      maxParticipants: formation.effectifMax,
      enrolledCount: 0,
      isFull: false,
      trainingSessionId: null,
    });
  }
  return rows;
}

/** Évite le doublon LMS si une session ops confirmée existe pour le même catalogue et le même jour. */
function dedupeSessions(rows: DatesLieuxSessionRow[]): DatesLieuxSessionRow[] {
  const seen = new Set<string>();
  const out: DatesLieuxSessionRow[] = [];
  const priority = (r: DatesLieuxSessionRow) => (r.source === 'training_ops' ? 2 : 1);
  const sorted = [...rows].sort((a, b) => {
    const keyA = `${a.formationCode}:${a.sessionDate}`;
    const keyB = `${b.formationCode}:${b.sessionDate}`;
    if (keyA !== keyB) return a.sessionDate.localeCompare(b.sessionDate);
    return priority(b) - priority(a);
  });
  for (const row of sorted) {
    const key = `${row.formationCode}:${row.sessionDate}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row);
  }
  return out.sort((a, b) => a.sessionDate.localeCompare(b.sessionDate));
}

export async function loadDatesLieuxConfirmedSessions(): Promise<DatesLieuxSessionRow[]> {
  const [ops, lms] = await Promise.all([loadTrainingOpsPublicSessions(), loadLmsCourseSessions()]);
  return dedupeSessions([...ops, ...lms]);
}

export function buildDatesLieuxOnDemandRows(
  confirmed: readonly DatesLieuxSessionRow[],
): DatesLieuxOnDemandRow[] {
  const withUpcoming = new Set(confirmed.map((s) => s.formationSlug));
  return getPublishedFormations()
    .filter((f) => !withUpcoming.has(f.slug))
    .map((formation) => ({
      kind: 'on_demand' as const,
      formationSlug: formation.slug,
      formationCode: formation.code,
      formationTitle: formation.titre,
      formationHref: formationHref(formation),
      niveau: formation.niveau,
      niveauLabel: datesLieuxNiveauFilterLabel(formation.niveau),
      dureeLabel: libelleDureeFormation(formation),
      tarifParticipantHt: formation.tarifParticipantHt ?? 0,
    }));
}
