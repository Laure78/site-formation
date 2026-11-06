/**
 * Formations IA BTP catalogue — options formulaire recrutement formateurs.
 */
import { getFormationByCode, type Formation } from '@/data/formations';
import { getFormationsCatalogue } from '@/lib/formations-catalogue-display';

export type ConsultantFormationIaOption = {
  id: string;
  titre: string;
  duree: string;
  href: string;
};

export type RecruitmentFormationFormatBucket = {
  key: 'debutant-4h' | 'avance-4h' | 'approfondi-14h';
  title: string;
  dureeLabel: string;
  formations: readonly ConsultantFormationIaOption[];
};

function formatBucketKeyForFormation(f: Formation): RecruitmentFormationFormatBucket['key'] | null {
  if (f.duree === '14 h') return 'approfondi-14h';
  if (f.duree !== '4 h') return null;
  return f.niveau === 1 ? 'debutant-4h' : 'avance-4h';
}

const FORMAT_META: Record<
  RecruitmentFormationFormatBucket['key'],
  { title: string; dureeLabel: string }
> = {
  'debutant-4h': { title: 'Débutant — 4 h', dureeLabel: '4 heures' },
  'avance-4h': { title: 'Avancé — 4 h', dureeLabel: '4 heures' },
  'approfondi-14h': { title: 'Approfondi — 14 h', dureeLabel: '14 heures (2 jours)' },
};

export function getConsultantFormationsIaBtpOptions(): ConsultantFormationIaOption[] {
  return getFormationsCatalogue().map((f) => ({
    id: f.ref,
    titre: f.title,
    duree: f.duree,
    href: f.href,
  }));
}

export function getRecruitmentFormationFormatBuckets(): RecruitmentFormationFormatBucket[] {
  const byKey = new Map<RecruitmentFormationFormatBucket['key'], ConsultantFormationIaOption[]>();

  for (const f of getConsultantFormationsIaBtpOptions()) {
    const formation = getFormationByCode(f.id);
    if (!formation) continue;
    const key = formatBucketKeyForFormation(formation);
    if (!key) continue;
    const list = byKey.get(key) ?? [];
    list.push(f);
    byKey.set(key, list);
  }

  return (['debutant-4h', 'avance-4h', 'approfondi-14h'] as const)
    .filter((key) => (byKey.get(key)?.length ?? 0) > 0)
    .map((key) => ({
      key,
      ...FORMAT_META[key],
      formations: byKey.get(key) ?? [],
    }));
}

const FORMATION_BY_CODE = new Map(
  getConsultantFormationsIaBtpOptions().map((f) => [f.id, f.titre] as const),
);

/** Libellés pour emails / admin (codes NIV séparés par virgule). */
export function formatConsultantFormationCodes(raw: string | null | undefined): string {
  if (!raw?.trim()) return '';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((id) => id.startsWith('NIV-'))
    .map((id) => FORMATION_BY_CODE.get(id) ?? getFormationByCode(id)?.titre ?? id)
    .join(' · ');
}

export function isConsultantFormationCode(id: string): id is Formation['code'] {
  return id.startsWith('NIV-');
}
