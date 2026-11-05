import type { RecruitmentCandidatRow } from '@/lib/recruitment/types';

const TWO_YEARS_MS = 2 * 365.25 * 24 * 60 * 60 * 1000;

export function isStaleNonRetenu(candidat: Pick<RecruitmentCandidatRow, 'status' | 'last_contact_at'>): boolean {
  if (candidat.status !== 'non_retenu') return false;
  if (!candidat.last_contact_at) return false;
  const t = new Date(candidat.last_contact_at).getTime();
  if (Number.isNaN(t)) return false;
  return Date.now() - t > TWO_YEARS_MS;
}
