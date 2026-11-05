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
  key: 'express-4h' | 'approfondi-7h' | 'avance-14h';
  title: string;
  dureeLabel: string;
  formations: readonly ConsultantFormationIaOption[];
};

const FORMAT_BY_DUREE: Record<string, RecruitmentFormationFormatBucket['key']> = {
  '4 h': 'express-4h',
  '7 h': 'approfondi-7h',
  '14 h': 'avance-14h',
};

const FORMAT_META: Record<
  RecruitmentFormationFormatBucket['key'],
  { title: string; dureeLabel: string }
> = {
  'express-4h': { title: 'Format Express', dureeLabel: '4 heures' },
  'approfondi-7h': { title: 'Format Approfondi', dureeLabel: '7 heures' },
  'avance-14h': { title: 'Ateliers avancés', dureeLabel: '14 heures' },
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
    const key = FORMAT_BY_DUREE[f.duree];
    if (!key) continue;
    const list = byKey.get(key) ?? [];
    list.push(f);
    byKey.set(key, list);
  }

  return (['express-4h', 'approfondi-7h', 'avance-14h'] as const)
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
