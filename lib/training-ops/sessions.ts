import { createAdminClient } from '@/lib/supabase/admin';
import { logSessionActivity } from '@/lib/training-ops/activity';
import { seedSessionChecklist, refreshSessionChecklist } from '@/lib/training-ops/checklist';
import { ensureProgramFromCatalogueCode } from '@/lib/training-ops/programs';
import type {
  SessionListRow,
  TrainingModality,
  TrainingSession,
  TrainingSessionStatus,
} from '@/lib/training-ops/types';

export type CreateSessionInput = {
  catalogueCode: string;
  name?: string;
  companyId?: string | null;
  primaryTrainerId?: string | null;
  modality?: TrainingModality;
  startsOn?: string | null;
  endsOn?: string | null;
  scheduleText?: string | null;
  durationHours?: number | null;
  daysCount?: number | null;
  locationAddress?: string | null;
  locationCity?: string | null;
  meetingUrl?: string | null;
  maxParticipants?: number | null;
  companyContactName?: string | null;
  companyContactEmail?: string | null;
  companyContactPhone?: string | null;
  internalNotes?: string | null;
  actorId: string;
  copyProgramResources?: boolean;
};

async function allocateReference(prefix: string, year: number): Promise<string> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc('allocate_training_session_reference', {
    p_prefix: prefix,
    p_year: year,
  });
  if (error || !data) {
    throw new Error(error?.message ?? 'Impossible d’allouer la référence session');
  }
  return String(data);
}

async function copyProgramResourcesToSession(
  sessionId: string,
  programId: string,
  actorId: string
): Promise<number> {
  const supabase = createAdminClient();
  const { data: resources } = await supabase
    .from('training_program_resources')
    .select('*')
    .eq('program_id', programId)
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (!resources?.length) return 0;

  const rows = resources.map((r) => ({
    session_id: sessionId,
    source_program_resource_id: r.id,
    title: r.title,
    resource_type: r.resource_type,
    description: r.description,
    storage_path: r.storage_path,
    external_url: r.external_url,
    version_label: r.version_label,
    sort_order: r.sort_order,
    is_published: true,
    is_hidden: false,
    customized: false,
    updated_by: actorId,
  }));

  const { error } = await supabase.from('training_session_resources').insert(rows);
  if (error) throw new Error(error.message);
  return rows.length;
}

export async function createTrainingSession(
  input: CreateSessionInput
): Promise<TrainingSession> {
  const supabase = createAdminClient();
  const program = await ensureProgramFromCatalogueCode(input.catalogueCode);
  const year = input.startsOn
    ? Number(input.startsOn.slice(0, 4))
    : new Date().getFullYear();
  const reference = await allocateReference(program.reference_prefix || 'IA-BTP', year);

  const name =
    input.name?.trim() ||
    `${program.title}${input.companyId ? '' : ''} — session ${reference}`;

  const { data, error } = await supabase
    .from('training_sessions')
    .insert({
      reference,
      program_id: program.id,
      company_id: input.companyId ?? null,
      name,
      status: 'a_preparer' satisfies TrainingSessionStatus,
      modality: input.modality ?? program.default_modality,
      starts_on: input.startsOn ?? null,
      ends_on: input.endsOn ?? null,
      schedule_text: input.scheduleText ?? null,
      duration_hours: input.durationHours ?? program.default_duration_hours,
      days_count: input.daysCount ?? null,
      location_address: input.locationAddress ?? null,
      location_city: input.locationCity ?? null,
      meeting_url: input.meetingUrl ?? null,
      max_participants: input.maxParticipants ?? null,
      company_contact_name: input.companyContactName ?? null,
      company_contact_email: input.companyContactEmail ?? null,
      company_contact_phone: input.companyContactPhone ?? null,
      internal_notes: input.internalNotes ?? null,
      primary_trainer_id: input.primaryTrainerId ?? null,
      created_by: input.actorId,
    })
    .select('*')
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? 'Création de session impossible');
  }

  const session = data as TrainingSession;

  if (input.primaryTrainerId) {
    await supabase.from('training_session_trainers').upsert({
      session_id: session.id,
      trainer_id: input.primaryTrainerId,
      is_primary: true,
    });
  }

  await seedSessionChecklist(session.id);

  if (input.copyProgramResources !== false) {
    const n = await copyProgramResourcesToSession(session.id, program.id, input.actorId);
    if (n > 0) {
      await logSessionActivity({
        sessionId: session.id,
        actorId: input.actorId,
        action: 'supports_copies',
        details: { count: n },
      });
    }
  }

  await logSessionActivity({
    sessionId: session.id,
    actorId: input.actorId,
    action: 'session_created',
    details: { reference: session.reference },
  });

  await refreshSessionChecklist(session.id);
  return session;
}

export type ListSessionsFilters = {
  q?: string;
  programId?: string;
  companyId?: string;
  trainerId?: string;
  status?: TrainingSessionStatus | 'all';
  modality?: TrainingModality | 'all';
  year?: number | null;
  archived?: 'exclude' | 'only' | 'include';
  page?: number;
  pageSize?: number;
};

export async function listTrainingSessions(
  filters: ListSessionsFilters = {}
): Promise<{ rows: SessionListRow[]; total: number }> {
  const supabase = createAdminClient();
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(50, Math.max(10, filters.pageSize ?? 20));
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('training_sessions')
    .select(
      `
      *,
      program:training_programs(title, catalogue_code),
      company:training_companies(name)
    `,
      { count: 'exact' }
    )
    .order('starts_on', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (filters.archived === 'exclude' || !filters.archived) {
    query = query.is('archived_at', null);
  } else if (filters.archived === 'only') {
    query = query.not('archived_at', 'is', null);
  }

  if (filters.programId) query = query.eq('program_id', filters.programId);
  if (filters.companyId) query = query.eq('company_id', filters.companyId);
  if (filters.trainerId) query = query.eq('primary_trainer_id', filters.trainerId);
  if (filters.status && filters.status !== 'all') query = query.eq('status', filters.status);
  if (filters.modality && filters.modality !== 'all') query = query.eq('modality', filters.modality);
  if (filters.year) {
    query = query
      .gte('starts_on', `${filters.year}-01-01`)
      .lte('starts_on', `${filters.year}-12-31`);
  }
  if (filters.q?.trim()) {
    const q = filters.q.trim();
    query = query.or(`reference.ilike.%${q}%,name.ilike.%${q}%`);
  }

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  const sessionIds = (data ?? []).map((s) => s.id as string);
  const [parts, docs, trainers] = await Promise.all([
    sessionIds.length
      ? supabase
          .from('training_session_participants')
          .select('session_id')
          .in('session_id', sessionIds)
          .neq('status', 'annule')
      : Promise.resolve({ data: [] as { session_id: string }[] }),
    sessionIds.length
      ? supabase
          .from('training_session_documents')
          .select('session_id')
          .in('session_id', sessionIds)
      : Promise.resolve({ data: [] as { session_id: string }[] }),
    sessionIds.length
      ? supabase
          .from('profiles')
          .select('id, full_name, email')
          .in(
            'id',
            [
              ...new Set(
                (data ?? [])
                  .map((s) => s.primary_trainer_id as string | null)
                  .filter(Boolean) as string[]
              ),
            ]
          )
      : Promise.resolve({ data: [] as { id: string; full_name: string | null; email: string | null }[] }),
  ]);

  const partCount = new Map<string, number>();
  for (const p of parts.data ?? []) {
    partCount.set(p.session_id, (partCount.get(p.session_id) ?? 0) + 1);
  }
  const docCount = new Map<string, number>();
  for (const d of docs.data ?? []) {
    docCount.set(d.session_id, (docCount.get(d.session_id) ?? 0) + 1);
  }
  const trainerMap = new Map(
    (trainers.data ?? []).map((t) => [t.id, t.full_name || t.email || '—'])
  );

  const rows: SessionListRow[] = (data ?? []).map((s) => {
    const program = s.program as
      | { title: string; catalogue_code: string | null }
      | { title: string; catalogue_code: string | null }[]
      | null;
    const company = s.company as { name: string } | { name: string }[] | null;
    const programObj = Array.isArray(program) ? program[0] : program;
    const companyObj = Array.isArray(company) ? company[0] : company;

    return {
      ...(s as TrainingSession),
      program_title: programObj?.title ?? null,
      catalogue_code: programObj?.catalogue_code ?? null,
      company_name: companyObj?.name ?? null,
      trainer_name: s.primary_trainer_id
        ? trainerMap.get(s.primary_trainer_id as string) ?? null
        : null,
      participants_count: partCount.get(s.id as string) ?? 0,
      documents_count: docCount.get(s.id as string) ?? 0,
    };
  });

  return { rows, total: count ?? rows.length };
}

export async function getTrainingSession(sessionId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_sessions')
    .select(
      `
      *,
      program:training_programs(*),
      company:training_companies(*)
    `
    )
    .eq('id', sessionId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function duplicateTrainingSession(params: {
  sourceSessionId: string;
  actorId: string;
  keepCompany?: boolean;
  keepTrainer?: boolean;
  keepSupports?: boolean;
}): Promise<TrainingSession> {
  const supabase = createAdminClient();
  const source = await getTrainingSession(params.sourceSessionId);
  if (!source) throw new Error('Session introuvable');

  const program = source.program as { catalogue_code: string | null; id: string };
  if (!program?.catalogue_code) {
    throw new Error('Programme sans code catalogue — duplication impossible');
  }

  const created = await createTrainingSession({
    catalogueCode: program.catalogue_code,
    name: `${source.name} (copie)`,
    companyId: params.keepCompany ? source.company_id : null,
    primaryTrainerId: params.keepTrainer ? source.primary_trainer_id : null,
    modality: source.modality,
    durationHours: source.duration_hours,
    daysCount: source.days_count,
    locationAddress: source.location_address,
    locationCity: source.location_city,
    meetingUrl: source.meeting_url,
    maxParticipants: source.max_participants,
    actorId: params.actorId,
    copyProgramResources: !params.keepSupports,
  });

  if (params.keepSupports) {
    const { data: resources } = await supabase
      .from('training_session_resources')
      .select('*')
      .eq('session_id', params.sourceSessionId)
      .order('sort_order', { ascending: true });

    if (resources?.length) {
      await supabase.from('training_session_resources').insert(
        resources.map((r) => ({
          session_id: created.id,
          source_program_resource_id: r.source_program_resource_id,
          title: r.title,
          resource_type: r.resource_type,
          description: r.description,
          storage_path: r.storage_path,
          external_url: r.external_url,
          version_label: r.version_label,
          sort_order: r.sort_order,
          is_published: r.is_published,
          is_hidden: r.is_hidden,
          customized: r.customized,
          updated_by: params.actorId,
        }))
      );
    }
  }

  await logSessionActivity({
    sessionId: created.id,
    actorId: params.actorId,
    action: 'session_duplicated',
    details: { from: source.reference },
  });

  return created;
}

export async function archiveTrainingSession(sessionId: string, actorId: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('training_sessions')
    .update({ archived_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('id', sessionId);
  if (error) throw new Error(error.message);
  await logSessionActivity({
    sessionId,
    actorId,
    action: 'session_archived',
  });
}

export async function deleteTrainingSession(sessionId: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('training_sessions')
    .select('status, archived_at')
    .eq('id', sessionId)
    .maybeSingle();
  if (!data) throw new Error('Session introuvable');
  if (data.status === 'cloturee' && !data.archived_at) {
    throw new Error('Archivez d’abord une session clôturée avant suppression définitive.');
  }
  const { error } = await supabase.from('training_sessions').delete().eq('id', sessionId);
  if (error) throw new Error(error.message);
}
