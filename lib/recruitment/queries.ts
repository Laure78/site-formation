import { createAdminClient } from '@/lib/supabase/admin';
import { interviewAtToDateYmd } from '@/lib/recruitment/interview-slots';
import type {
  RecruitmentCandidatRow,
  RecruitmentEvaluationRow,
  RecruitmentNoteRow,
} from '@/lib/recruitment/types';

export async function listRecruitmentCandidats(filters?: {
  status?: string;
  stage?: string;
  formation?: string;
  nda_status?: string;
  triage_status?: string;
  btp_experience_status?: string;
  q?: string;
}): Promise<RecruitmentCandidatRow[]> {
  const admin = createAdminClient();
  let q = admin.from('recruitment_candidats').select('*').order('last_name').order('first_name');

  if (filters?.status?.trim()) {
    q = q.eq('status', filters.status.trim());
  }
  if (filters?.stage === '1' || filters?.stage === '2') {
    q = q.eq('stage', Number(filters.stage));
  }
  if (filters?.formation?.trim()) {
    q = q.contains('formations', [filters.formation.trim()]);
  }
  if (filters?.nda_status?.trim()) {
    q = q.eq('nda_status', filters.nda_status.trim());
  }
  if (filters?.triage_status?.trim()) {
    q = q.eq('triage_status', filters.triage_status.trim());
  }
  if (filters?.btp_experience_status?.trim()) {
    q = q.eq('btp_experience_status', filters.btp_experience_status.trim());
  }
  const { data, error } = await q;
  if (error) {
    console.error('[listRecruitmentCandidats]', error.message);
    return [];
  }
  let rows = (data ?? []) as RecruitmentCandidatRow[];
  const qTerm = filters?.q?.trim().toLowerCase();
  if (qTerm) {
    rows = rows.filter(
      (r) =>
        r.first_name.toLowerCase().includes(qTerm) ||
        r.last_name.toLowerCase().includes(qTerm),
    );
  }
  return rows;
}

export async function getRecruitmentCandidat(id: string): Promise<RecruitmentCandidatRow | null> {
  const admin = createAdminClient();
  const { data, error } = await admin.from('recruitment_candidats').select('*').eq('id', id).maybeSingle();
  if (error || !data) return null;
  return data as RecruitmentCandidatRow;
}

export async function listCandidatsForPlanningDate(dateYmd: string): Promise<RecruitmentCandidatRow[]> {
  const all = await listRecruitmentCandidats();
  return all.filter((c) => interviewAtToDateYmd(c.interview_at) === dateYmd);
}

export async function listRecruitmentNotes(candidatId: string): Promise<RecruitmentNoteRow[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('recruitment_candidat_notes')
    .select('*')
    .eq('candidat_id', candidatId)
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data ?? []) as RecruitmentNoteRow[];
}

export async function getRecruitmentEvaluation(
  candidatId: string,
  stage: 1 | 2,
): Promise<RecruitmentEvaluationRow | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('recruitment_evaluations')
    .select('*')
    .eq('candidat_id', candidatId)
    .eq('stage', stage)
    .maybeSingle();
  if (error || !data) return null;
  return data as RecruitmentEvaluationRow;
}

export async function listStaleNonRetenus(): Promise<RecruitmentCandidatRow[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('recruitment_candidats')
    .select('*')
    .eq('status', 'non_retenu')
    .not('last_contact_at', 'is', null);
  if (error) return [];
  const { isStaleNonRetenu } = await import('@/lib/recruitment/rgpd');
  return ((data ?? []) as RecruitmentCandidatRow[]).filter(isStaleNonRetenu);
}
