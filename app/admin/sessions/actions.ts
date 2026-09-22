'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import { createTrainingCompany } from '@/lib/training-ops/companies';
import {
  addParticipantToSession,
  generateCertificatesForSession,
  generateConvocationsForSession,
  removeParticipant,
  upsertPerson,
} from '@/lib/training-ops/participants';
import {
  addAttendanceSheet,
  closeTrainingSession,
  restoreSessionResourceFromTemplate,
  saveTrainerReport,
  updateSessionResource,
} from '@/lib/training-ops/ops';
import { syncAllCataloguePrograms } from '@/lib/training-ops/programs';
import {
  archiveTrainingSession,
  createTrainingSession,
  deleteTrainingSession,
  duplicateTrainingSession,
} from '@/lib/training-ops/sessions';
import type { TrainingModality, TrainingSessionStatus } from '@/lib/training-ops/types';
import { createAdminClient } from '@/lib/supabase/admin';

async function requireActor() {
  const access = await requireAdminAccess();
  if (!access.ok) {
    throw new Error('Accès refusé');
  }
  return access.user.id;
}

function revalidateSession(sessionId: string) {
  revalidatePath(LINKS.adminSessions);
  revalidatePath(`${LINKS.adminSessions}/${sessionId}`);
  revalidatePath(LINKS.adminSessionsDashboard);
}

export async function syncProgramsAction() {
  await requireActor();
  const n = await syncAllCataloguePrograms();
  revalidatePath(LINKS.adminSessions);
  return { ok: true as const, count: n };
}

export async function createSessionAction(formData: FormData) {
  const actorId = await requireActor();
  const catalogueCode = String(formData.get('catalogueCode') ?? '').trim();
  if (!catalogueCode) throw new Error('Formation catalogue requise');

  const companyId = String(formData.get('companyId') ?? '').trim() || null;
  const primaryTrainerId = String(formData.get('primaryTrainerId') ?? '').trim() || null;
  const modality = (String(formData.get('modality') ?? 'presentiel') ||
    'presentiel') as TrainingModality;

  const session = await createTrainingSession({
    catalogueCode,
    name: String(formData.get('name') ?? '').trim() || undefined,
    companyId,
    primaryTrainerId,
    modality,
    startsOn: String(formData.get('startsOn') ?? '').trim() || null,
    endsOn: String(formData.get('endsOn') ?? '').trim() || null,
    scheduleText: String(formData.get('scheduleText') ?? '').trim() || null,
    durationHours: Number(formData.get('durationHours') || 0) || null,
    daysCount: Number(formData.get('daysCount') || 0) || null,
    locationAddress: String(formData.get('locationAddress') ?? '').trim() || null,
    locationCity: String(formData.get('locationCity') ?? '').trim() || null,
    meetingUrl: String(formData.get('meetingUrl') ?? '').trim() || null,
    maxParticipants: Number(formData.get('maxParticipants') || 0) || null,
    companyContactName: String(formData.get('companyContactName') ?? '').trim() || null,
    companyContactEmail: String(formData.get('companyContactEmail') ?? '').trim() || null,
    companyContactPhone: String(formData.get('companyContactPhone') ?? '').trim() || null,
    internalNotes: String(formData.get('internalNotes') ?? '').trim() || null,
    actorId,
  });

  revalidateSession(session.id);
  redirect(`${LINKS.adminSessions}/${session.id}`);
}

export async function createCompanyAction(formData: FormData) {
  const actorId = await requireActor();
  const name = String(formData.get('name') ?? '').trim();
  if (!name) throw new Error('Nom d’entreprise requis');
  await createTrainingCompany({
    name,
    siret: String(formData.get('siret') ?? '').trim() || null,
    city: String(formData.get('city') ?? '').trim() || null,
    contactName: String(formData.get('contactName') ?? '').trim() || null,
    contactEmail: String(formData.get('contactEmail') ?? '').trim() || null,
    contactPhone: String(formData.get('contactPhone') ?? '').trim() || null,
    actorId,
  });
  revalidatePath(LINKS.adminSessions);
  revalidatePath(LINKS.adminSessionsEntreprises);
  revalidatePath(LINKS.adminSessionsNouvelle);
}

export async function updateSessionStatusAction(formData: FormData) {
  const actorId = await requireActor();
  const sessionId = String(formData.get('sessionId') ?? '');
  const status = String(formData.get('status') ?? '') as TrainingSessionStatus;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('training_sessions')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', sessionId);
  if (error) throw new Error(error.message);
  const { logSessionActivity } = await import('@/lib/training-ops/activity');
  await logSessionActivity({
    sessionId,
    actorId,
    action: 'status_updated',
    details: { status },
  });
  revalidateSession(sessionId);
}

export async function addParticipantAction(formData: FormData) {
  const actorId = await requireActor();
  const sessionId = String(formData.get('sessionId') ?? '');
  const person = await upsertPerson({
    firstName: String(formData.get('firstName') ?? ''),
    lastName: String(formData.get('lastName') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? '').trim() || null,
    jobTitle: String(formData.get('jobTitle') ?? '').trim() || null,
    department: String(formData.get('department') ?? '').trim() || null,
    companyId: String(formData.get('companyId') ?? '').trim() || null,
    actorId,
  });
  await addParticipantToSession({
    sessionId,
    personId: person.id,
    jobTitle: person.job_title,
    department: person.department,
    actorId,
  });
  revalidateSession(sessionId);
}

export async function removeParticipantAction(formData: FormData) {
  const actorId = await requireActor();
  const participantId = String(formData.get('participantId') ?? '');
  const sessionId = String(formData.get('sessionId') ?? '');
  await removeParticipant(participantId, actorId);
  revalidateSession(sessionId);
}

export async function generateConvocationsAction(formData: FormData) {
  const actorId = await requireActor();
  const sessionId = String(formData.get('sessionId') ?? '');
  await generateConvocationsForSession(sessionId, actorId);
  revalidateSession(sessionId);
}

export async function generateCertificatesAction(formData: FormData) {
  const actorId = await requireActor();
  const sessionId = String(formData.get('sessionId') ?? '');
  await generateCertificatesForSession(sessionId, actorId);
  revalidateSession(sessionId);
}

export async function addAttendanceAction(formData: FormData) {
  const actorId = await requireActor();
  const sessionId = String(formData.get('sessionId') ?? '');
  await addAttendanceSheet({
    sessionId,
    sheetDate: String(formData.get('sheetDate') ?? ''),
    label: String(formData.get('label') ?? 'Émargement'),
    actorId,
  });
  revalidateSession(sessionId);
}

export async function saveTrainerReportAction(formData: FormData) {
  const actorId = await requireActor();
  const sessionId = String(formData.get('sessionId') ?? '');
  const validate = formData.get('validate') === '1';
  await saveTrainerReport({
    sessionId,
    actorId,
    validate,
    fields: {
      deroulement: String(formData.get('deroulement') ?? '') || null,
      participation_groupe: String(formData.get('participation_groupe') ?? '') || null,
      objectifs_atteints: String(formData.get('objectifs_atteints') ?? '') || null,
      difficultes: String(formData.get('difficultes') ?? '') || null,
      adaptations: String(formData.get('adaptations') ?? '') || null,
      points_ameliorer: String(formData.get('points_ameliorer') ?? '') || null,
      observations: String(formData.get('observations') ?? '') || null,
      recommandations: String(formData.get('recommandations') ?? '') || null,
      commentaires: String(formData.get('commentaires') ?? '') || null,
    },
  });
  revalidateSession(sessionId);
}

export async function closeSessionAction(formData: FormData) {
  const actorId = await requireActor();
  const sessionId = String(formData.get('sessionId') ?? '');
  const force = formData.get('force') === '1';
  const result = await closeTrainingSession({
    sessionId,
    actorId,
    force,
    forceReason: String(formData.get('forceReason') ?? '') || undefined,
  });
  revalidateSession(sessionId);
  if (!result.ok) {
    throw new Error(`Impossible de clôturer : ${result.blockers.join(' · ')}`);
  }
}

export async function archiveSessionAction(formData: FormData) {
  const actorId = await requireActor();
  const sessionId = String(formData.get('sessionId') ?? '');
  await archiveTrainingSession(sessionId, actorId);
  revalidatePath(LINKS.adminSessions);
  redirect(LINKS.adminSessions);
}

export async function deleteSessionAction(formData: FormData) {
  await requireActor();
  const sessionId = String(formData.get('sessionId') ?? '');
  await deleteTrainingSession(sessionId);
  revalidatePath(LINKS.adminSessions);
  redirect(LINKS.adminSessions);
}

export async function duplicateSessionAction(formData: FormData) {
  const actorId = await requireActor();
  const sessionId = String(formData.get('sessionId') ?? '');
  const created = await duplicateTrainingSession({
    sourceSessionId: sessionId,
    actorId,
    keepCompany: formData.get('keepCompany') === '1',
    keepTrainer: formData.get('keepTrainer') === '1',
    keepSupports: formData.get('keepSupports') === '1',
  });
  revalidatePath(LINKS.adminSessions);
  redirect(`${LINKS.adminSessions}/${created.id}`);
}

export async function updateSupportAction(formData: FormData) {
  const actorId = await requireActor();
  const sessionId = String(formData.get('sessionId') ?? '');
  await updateSessionResource({
    resourceId: String(formData.get('resourceId') ?? ''),
    actorId,
    title: String(formData.get('title') ?? '') || undefined,
    externalUrl: String(formData.get('externalUrl') ?? '').trim() || null,
    description: String(formData.get('description') ?? '').trim() || null,
  });
  revalidateSession(sessionId);
}

export async function restoreSupportAction(formData: FormData) {
  const actorId = await requireActor();
  const sessionId = String(formData.get('sessionId') ?? '');
  await restoreSessionResourceFromTemplate(String(formData.get('resourceId') ?? ''), actorId);
  revalidateSession(sessionId);
}

export async function updateSessionFieldsAction(formData: FormData) {
  await requireActor();
  const sessionId = String(formData.get('sessionId') ?? '');
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('training_sessions')
    .update({
      name: String(formData.get('name') ?? '').trim(),
      company_id: String(formData.get('companyId') ?? '').trim() || null,
      primary_trainer_id: String(formData.get('primaryTrainerId') ?? '').trim() || null,
      modality: String(formData.get('modality') ?? 'presentiel'),
      starts_on: String(formData.get('startsOn') ?? '').trim() || null,
      ends_on: String(formData.get('endsOn') ?? '').trim() || null,
      schedule_text: String(formData.get('scheduleText') ?? '').trim() || null,
      duration_hours: Number(formData.get('durationHours') || 0) || null,
      days_count: Number(formData.get('daysCount') || 0) || null,
      location_address: String(formData.get('locationAddress') ?? '').trim() || null,
      location_city: String(formData.get('locationCity') ?? '').trim() || null,
      meeting_url: String(formData.get('meetingUrl') ?? '').trim() || null,
      max_participants: Number(formData.get('maxParticipants') || 0) || null,
      company_contact_name: String(formData.get('companyContactName') ?? '').trim() || null,
      company_contact_email: String(formData.get('companyContactEmail') ?? '').trim() || null,
      company_contact_phone: String(formData.get('companyContactPhone') ?? '').trim() || null,
      internal_notes: String(formData.get('internalNotes') ?? '').trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', sessionId);
  if (error) throw new Error(error.message);
  const { refreshSessionChecklist } = await import('@/lib/training-ops/checklist');
  await refreshSessionChecklist(sessionId);
  revalidateSession(sessionId);
}
