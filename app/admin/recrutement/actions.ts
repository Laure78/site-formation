'use server';

import { revalidatePath } from 'next/cache';
import { requireAdminAccess } from '@/lib/admin-access';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  adminRecrutementCandidat,
  adminRecrutementEvaluation,
  LINKS,
} from '@/lib/internal-links';
import {
  RECRUITMENT_BTP_EXPERIENCE,
  RECRUITMENT_FORMATION_OPTIONS,
  RECRUITMENT_LEGAL_STATUS,
  RECRUITMENT_MODALITY,
  RECRUITMENT_NDA_STATUS,
  RECRUITMENT_SOURCES,
  RECRUITMENT_STATUS,
  RECRUITMENT_TRIAGE_STATUS,
  type RecruitmentFormationId,
} from '@/lib/recruitment/constants';
import {
  EVALUATION_CRITERIA_ETAPE_1,
  EVALUATION_CRITERIA_ETAPE_2,
  EVALUATION_DECISIONS_ETAPE_1,
  EVALUATION_DECISIONS_ETAPE_2,
} from '@/lib/recruitment/evaluation-criteria';
import { slotToInterviewAt, type InterviewSlotTime } from '@/lib/recruitment/interview-slots';

const FORMATION_IDS = new Set<string>(RECRUITMENT_FORMATION_OPTIONS.map((f) => f.id));

function parseEnum<T extends Record<string, string>>(
  map: T,
  raw: FormDataEntryValue | null,
): keyof T | null {
  const v = String(raw ?? '').trim();
  if (!v) return null;
  return v in map ? (v as keyof T) : null;
}

function parseFormations(raw: FormData): string[] {
  const ids = raw.getAll('formations').map((x) => String(x).trim());
  return ids.filter((id) => FORMATION_IDS.has(id));
}

export async function upsertRecruitmentCandidatAction(
  candidatId: string | null,
  formData: FormData,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const first_name = String(formData.get('first_name') ?? '').trim();
  const last_name = String(formData.get('last_name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  if (!first_name || !last_name || !email) {
    return { ok: false, error: 'Prénom, nom et email sont requis.' };
  }

  const stageRaw = Number(formData.get('stage'));
  const stage = stageRaw === 2 ? 2 : 1;

  const status = parseEnum(RECRUITMENT_STATUS, formData.get('status')) ?? 'a_confirmer';
  const legal_status = parseEnum(RECRUITMENT_LEGAL_STATUS, formData.get('legal_status'));
  const source = parseEnum(RECRUITMENT_SOURCES, formData.get('source'));
  const interview_modality = parseEnum(RECRUITMENT_MODALITY, formData.get('interview_modality'));
  const nda_status = parseEnum(RECRUITMENT_NDA_STATUS, formData.get('nda_status'));
  const triage_status = parseEnum(RECRUITMENT_TRIAGE_STATUS, formData.get('triage_status'));
  const btp_experience_status = parseEnum(RECRUITMENT_BTP_EXPERIENCE, formData.get('btp_experience_status'));

  const interview_date = String(formData.get('interview_date') ?? '').trim();
  const interview_time = String(formData.get('interview_time') ?? '').trim() as InterviewSlotTime;
  let interview_at: string | null = null;
  if (interview_date && interview_time) {
    interview_at = slotToInterviewAt(interview_date, interview_time);
  }

  const last_contact_raw = String(formData.get('last_contact_at') ?? '').trim();
  const last_contact_at = last_contact_raw ? new Date(last_contact_raw).toISOString() : null;

  const row = {
    first_name,
    last_name,
    email,
    phone: String(formData.get('phone') ?? '').trim() || null,
    city: String(formData.get('city') ?? '').trim() || null,
    legal_status,
    siret: String(formData.get('siret') ?? '').trim() || null,
    nda: String(formData.get('nda') ?? '').trim() || null,
    nda_status,
    current_role: String(formData.get('current_role') ?? '').trim() || null,
    btp_background: String(formData.get('btp_background') ?? '').trim() || null,
    btp_experience_status,
    ai_usage: String(formData.get('ai_usage') ?? '').trim() || null,
    ai_competencies: String(formData.get('ai_competencies') ?? '').trim() || null,
    ai_tools: String(formData.get('ai_tools') ?? '').trim() || null,
    pedagogy_experience: String(formData.get('pedagogy_experience') ?? '').trim() || null,
    availability_notes: String(formData.get('availability_notes') ?? '').trim() || null,
    availability_summary: String(formData.get('availability_summary') ?? '').trim() || null,
    notice_period: String(formData.get('notice_period') ?? '').trim() || null,
    triage_status,
    strengths: String(formData.get('strengths') ?? '').trim() || null,
    to_verify: String(formData.get('to_verify') ?? '').trim() || null,
    admin_notes: String(formData.get('admin_notes') ?? '').trim() || null,
    source,
    formations: parseFormations(formData) as RecruitmentFormationId[],
    stage,
    interview_at,
    interview_modality,
    zoom_link: String(formData.get('zoom_link') ?? '').trim() || null,
    zoom_id: String(formData.get('zoom_id') ?? '').trim() || null,
    zoom_passcode: String(formData.get('zoom_passcode') ?? '').trim() || null,
    status,
    last_contact_at,
  };

  const admin = createAdminClient();
  if (candidatId) {
    const { error } = await admin.from('recruitment_candidats').update(row).eq('id', candidatId);
    if (error) {
      if (error.code === '23505') return { ok: false, error: 'Ce créneau est déjà occupé.' };
      return { ok: false, error: error.message };
    }
    revalidatePath(LINKS.adminRecrutement);
    revalidatePath(LINKS.adminRecrutementCandidats);
    revalidatePath(adminRecrutementCandidat(candidatId));
    return { ok: true, id: candidatId };
  }

  const { data, error } = await admin.from('recruitment_candidats').insert(row).select('id').single();
  if (error || !data) {
    if (error?.code === '23505') return { ok: false, error: 'Ce créneau est déjà occupé.' };
    return { ok: false, error: error?.message ?? 'Erreur enregistrement.' };
  }
  revalidatePath(LINKS.adminRecrutement);
  revalidatePath(LINKS.adminRecrutementCandidats);
  return { ok: true, id: data.id as string };
}

export async function assignInterviewSlotAction(
  candidatId: string,
  dateYmd: string,
  slotTime: InterviewSlotTime,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { error } = await admin
    .from('recruitment_candidats')
    .update({ interview_at: slotToInterviewAt(dateYmd, slotTime) })
    .eq('id', candidatId);
  if (error) {
    if (error.code === '23505') return { ok: false, error: 'Créneau déjà occupé.' };
    return { ok: false, error: error.message };
  }
  revalidatePath(LINKS.adminRecrutement);
  return { ok: true };
}

export async function clearInterviewSlotAction(
  candidatId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { error } = await admin.from('recruitment_candidats').update({ interview_at: null }).eq('id', candidatId);
  if (error) return { ok: false, error: error.message };
  revalidatePath(LINKS.adminRecrutement);
  return { ok: true };
}

export async function addRecruitmentNoteAction(
  candidatId: string,
  body: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const text = body.trim();
  if (!text) return { ok: false, error: 'Note vide.' };

  const admin = createAdminClient();
  const { error: noteErr } = await admin.from('recruitment_candidat_notes').insert({
    candidat_id: candidatId,
    body: text,
    created_by: access.userId,
  });
  if (noteErr) return { ok: false, error: noteErr.message };

  await admin
    .from('recruitment_candidats')
    .update({ last_contact_at: new Date().toISOString() })
    .eq('id', candidatId);

  revalidatePath(adminRecrutementCandidat(candidatId));
  return { ok: true };
}

export async function saveRecruitmentEvaluationAction(
  candidatId: string,
  stage: 1 | 2,
  formData: FormData,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const criteria = stage === 1 ? EVALUATION_CRITERIA_ETAPE_1 : EVALUATION_CRITERIA_ETAPE_2;
  const scores: Record<string, number> = {};
  for (const { key } of criteria) {
    const raw = formData.get(`score_${key}`);
    if (raw == null || raw === '') continue;
    const n = Number(raw);
    if (n >= 1 && n <= 4) scores[key] = n;
  }

  const decisionRaw = String(formData.get('decision') ?? '').trim();
  const decisions = stage === 1 ? EVALUATION_DECISIONS_ETAPE_1 : EVALUATION_DECISIONS_ETAPE_2;
  const decision = decisionRaw in decisions ? decisionRaw : null;

  const payload = {
    candidat_id: candidatId,
    stage,
    scores,
    strengths: String(formData.get('strengths') ?? '').trim() || null,
    vigilance: String(formData.get('vigilance') ?? '').trim() || null,
    decision,
    cas_pratique_subject:
      stage === 2 ? String(formData.get('cas_pratique_subject') ?? '').trim() || null : null,
    evaluator_id: access.userId,
  };

  const admin = createAdminClient();
  const { error } = await admin.from('recruitment_evaluations').upsert(payload, {
    onConflict: 'candidat_id,stage',
  });
  if (error) return { ok: false, error: error.message };

  if (decision === 'retenu_etape_2') {
    await admin
      .from('recruitment_candidats')
      .update({ status: 'retenu_etape_2', stage: 2 })
      .eq('id', candidatId);
  } else if (decision === 'non_retenu') {
    await admin.from('recruitment_candidats').update({ status: 'non_retenu' }).eq('id', candidatId);
  } else if (decision === 'retenu') {
    await admin.from('recruitment_candidats').update({ status: 'retenu' }).eq('id', candidatId);
  } else if (decision === 'a_revoir') {
    await admin.from('recruitment_candidats').update({ status: 'a_revoir' }).eq('id', candidatId);
  }

  revalidatePath(adminRecrutementCandidat(candidatId));
  revalidatePath(adminRecrutementEvaluation(candidatId, stage));
  return { ok: true };
}

export async function deleteRecruitmentCandidatAction(
  candidatId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { error } = await admin.from('recruitment_candidats').delete().eq('id', candidatId);
  if (error) return { ok: false, error: error.message };

  revalidatePath(LINKS.adminRecrutement);
  revalidatePath(LINKS.adminRecrutementCandidats);
  return { ok: true };
}
