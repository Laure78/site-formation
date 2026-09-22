import { createAdminClient } from '@/lib/supabase/admin';
import type { ChecklistItemStatus } from '@/lib/training-ops/types';

/** Initialise la checklist d’une session depuis les définitions actives. */
export async function seedSessionChecklist(sessionId: string): Promise<void> {
  const supabase = createAdminClient();
  const { data: defs } = await supabase
    .from('training_checklist_definitions')
    .select('id')
    .eq('is_active', true);

  if (!defs?.length) return;

  await supabase.from('training_session_checklist_items').upsert(
    defs.map((d) => ({
      session_id: sessionId,
      definition_id: d.id,
      status: 'a_faire' as ChecklistItemStatus,
    })),
    { onConflict: 'session_id,definition_id', ignoreDuplicates: true }
  );
}

type Counts = {
  participants: number;
  supports: number;
  convocationsGen: number;
  convocationsSent: number;
  attendanceSheets: number;
  evaluationsRecues: number;
  evaluationsTotal: number;
  certificatesGen: number;
  certificatesSent: number;
  hasCompany: boolean;
  hasDates: boolean;
  hasTrainer: boolean;
  hasReportValidated: boolean;
  isClosed: boolean;
};

async function loadCounts(sessionId: string): Promise<Counts> {
  const supabase = createAdminClient();
  const [
    sessionRes,
    partRes,
    suppRes,
    docsRes,
    attRes,
    evalRes,
    certRes,
    reportRes,
  ] = await Promise.all([
    supabase
      .from('training_sessions')
      .select('company_id, starts_on, ends_on, primary_trainer_id, closed_at, status')
      .eq('id', sessionId)
      .single(),
    supabase
      .from('training_session_participants')
      .select('id', { count: 'exact', head: true })
      .eq('session_id', sessionId)
      .neq('status', 'annule'),
    supabase
      .from('training_session_resources')
      .select('id', { count: 'exact', head: true })
      .eq('session_id', sessionId)
      .eq('is_hidden', false),
    supabase
      .from('training_session_documents')
      .select('id, status, category')
      .eq('session_id', sessionId)
      .eq('category', 'convocation'),
    supabase
      .from('training_attendance_sheets')
      .select('id', { count: 'exact', head: true })
      .eq('session_id', sessionId),
    supabase
      .from('training_session_evaluations')
      .select('id, status')
      .eq('session_id', sessionId)
      .eq('eval_type', 'chaud'),
    supabase
      .from('training_session_certificates')
      .select('id, status')
      .eq('session_id', sessionId),
    supabase
      .from('training_trainer_reports')
      .select('status')
      .eq('session_id', sessionId)
      .maybeSingle(),
  ]);

  const session = sessionRes.data;
  const convocations = docsRes.data ?? [];
  const evaluations = evalRes.data ?? [];
  const certificates = certRes.data ?? [];

  return {
    participants: partRes.count ?? 0,
    supports: suppRes.count ?? 0,
    convocationsGen: convocations.filter((d) =>
      ['genere', 'a_envoyer', 'envoye', 'telecharge'].includes(d.status)
    ).length,
    convocationsSent: convocations.filter((d) => d.status === 'envoye').length,
    attendanceSheets: attRes.count ?? 0,
    evaluationsRecues: evaluations.filter((e) => e.status === 'recue').length,
    evaluationsTotal: evaluations.length || (partRes.count ?? 0),
    certificatesGen: certificates.filter((c) =>
      ['generee', 'telechargee', 'envoyee'].includes(c.status)
    ).length,
    certificatesSent: certificates.filter((c) => c.status === 'envoyee').length,
    hasCompany: Boolean(session?.company_id),
    hasDates: Boolean(session?.starts_on && session?.ends_on),
    hasTrainer: Boolean(session?.primary_trainer_id),
    hasReportValidated: reportRes.data?.status === 'valide',
    isClosed: Boolean(session?.closed_at) || session?.status === 'cloturee',
  };
}

function mapAuto(
  source: string | null,
  counts: Counts
): ChecklistItemStatus | null {
  switch (source) {
    case 'session':
      return 'complet';
    case 'company':
      return counts.hasCompany ? 'complet' : 'a_faire';
    case 'dates':
      return counts.hasDates ? 'complet' : 'a_faire';
    case 'trainer':
      return counts.hasTrainer ? 'complet' : 'a_faire';
    case 'participants':
      if (counts.participants === 0) return 'a_faire';
      return counts.participants > 0 ? 'complet' : 'a_faire';
    case 'supports':
      return counts.supports > 0 ? 'complet' : 'a_faire';
    case 'convocations_gen':
      if (counts.participants === 0) return 'a_faire';
      if (counts.convocationsGen >= counts.participants) return 'complet';
      if (counts.convocationsGen > 0) return 'incomplet';
      return 'a_faire';
    case 'convocations_sent':
      if (counts.participants === 0) return 'a_faire';
      if (counts.convocationsSent >= counts.participants) return 'complet';
      if (counts.convocationsSent > 0) return 'incomplet';
      return 'a_faire';
    case 'attendance':
      return counts.attendanceSheets > 0 ? 'complet' : 'a_faire';
    case 'evaluations':
      if (counts.evaluationsTotal === 0) return 'a_faire';
      if (counts.evaluationsRecues >= counts.evaluationsTotal) return 'complet';
      if (counts.evaluationsRecues > 0) return 'incomplet';
      return 'a_faire';
    case 'trainer_report':
      return counts.hasReportValidated ? 'complet' : 'a_faire';
    case 'certificates':
      if (counts.participants === 0) return 'a_faire';
      if (counts.certificatesGen >= counts.participants) return 'complet';
      if (counts.certificatesGen > 0) return 'incomplet';
      return 'a_faire';
    case 'certificates_sent':
      if (counts.participants === 0) return 'a_faire';
      if (counts.certificatesSent >= counts.participants) return 'complet';
      if (counts.certificatesSent > 0) return 'incomplet';
      return 'a_faire';
    case 'closed':
      return counts.isClosed ? 'complet' : 'a_faire';
    default:
      return null;
  }
}

/** Recalcule les items auto de la checklist. */
export async function refreshSessionChecklist(sessionId: string) {
  const supabase = createAdminClient();
  await seedSessionChecklist(sessionId);
  const counts = await loadCounts(sessionId);

  const { data: items } = await supabase
    .from('training_session_checklist_items')
    .select('id, status, definition:training_checklist_definitions(id, auto_source, item_key, label, phase, sort_order)')
    .eq('session_id', sessionId);

  const updates: { id: string; status: ChecklistItemStatus; completed_at: string | null }[] = [];

  for (const item of items ?? []) {
    const def = item.definition as
      | { auto_source: string | null; item_key: string }
      | { auto_source: string | null; item_key: string }[]
      | null;
    const autoSource = Array.isArray(def) ? def[0]?.auto_source : def?.auto_source;
    const mapped = mapAuto(autoSource ?? null, counts);
    if (!mapped) continue;
    updates.push({
      id: item.id,
      status: mapped,
      completed_at: mapped === 'complet' ? new Date().toISOString() : null,
    });
  }

  for (const u of updates) {
    await supabase
      .from('training_session_checklist_items')
      .update({ status: u.status, completed_at: u.completed_at, updated_at: new Date().toISOString() })
      .eq('id', u.id);
  }

  return { counts, items: items ?? [] };
}

export type ProgressBlock = {
  key: string;
  label: string;
  status: ChecklistItemStatus;
  detail: string;
};

export async function buildSessionProgress(sessionId: string): Promise<ProgressBlock[]> {
  const counts = await loadCounts(sessionId);
  const blocks: ProgressBlock[] = [
    {
      key: 'participants',
      label: 'Participants',
      status: counts.participants > 0 ? 'complet' : 'a_faire',
      detail: String(counts.participants),
    },
    {
      key: 'supports',
      label: 'Supports',
      status: counts.supports > 0 ? 'complet' : 'a_faire',
      detail: counts.supports > 0 ? 'prêts' : 'à préparer',
    },
    {
      key: 'convocations',
      label: 'Convocations',
      status:
        counts.participants === 0
          ? 'a_faire'
          : counts.convocationsGen >= counts.participants
            ? 'complet'
            : counts.convocationsGen > 0
              ? 'incomplet'
              : 'a_faire',
      detail: `${counts.convocationsGen} / ${counts.participants}`,
    },
    {
      key: 'emargements',
      label: 'Émargements',
      status: counts.attendanceSheets > 0 ? 'complet' : 'a_faire',
      detail: String(counts.attendanceSheets),
    },
    {
      key: 'evaluations',
      label: 'Évaluations',
      status:
        counts.evaluationsRecues >= counts.evaluationsTotal && counts.evaluationsTotal > 0
          ? 'complet'
          : counts.evaluationsRecues > 0
            ? 'incomplet'
            : 'a_faire',
      detail: `${counts.evaluationsRecues} / ${counts.evaluationsTotal}`,
    },
    {
      key: 'bilan',
      label: 'Bilan formateur',
      status: counts.hasReportValidated ? 'complet' : 'a_faire',
      detail: counts.hasReportValidated ? 'complété' : 'à faire',
    },
    {
      key: 'attestations',
      label: 'Attestations',
      status:
        counts.participants > 0 && counts.certificatesGen >= counts.participants
          ? 'complet'
          : counts.certificatesGen > 0
            ? 'incomplet'
            : 'a_faire',
      detail: `${counts.certificatesGen} / ${counts.participants}`,
    },
  ];
  return blocks;
}
