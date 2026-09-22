import { createAdminClient } from '@/lib/supabase/admin';
import { logSessionActivity } from '@/lib/training-ops/activity';
import { refreshSessionChecklist } from '@/lib/training-ops/checklist';

export async function upsertPerson(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  jobTitle?: string | null;
  department?: string | null;
  companyId?: string | null;
  actorId: string;
}) {
  const supabase = createAdminClient();
  const email = input.email.trim().toLowerCase();
  const { data: existing } = await supabase
    .from('training_people')
    .select('*')
    .ilike('email', email)
    .maybeSingle();

  if (existing) {
    const { data, error } = await supabase
      .from('training_people')
      .update({
        first_name: input.firstName.trim(),
        last_name: input.lastName.trim(),
        phone: input.phone ?? existing.phone,
        job_title: input.jobTitle ?? existing.job_title,
        department: input.department ?? existing.department,
        company_id: input.companyId ?? existing.company_id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .select('*')
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  const { data, error } = await supabase
    .from('training_people')
    .insert({
      first_name: input.firstName.trim(),
      last_name: input.lastName.trim(),
      email,
      phone: input.phone ?? null,
      job_title: input.jobTitle ?? null,
      department: input.department ?? null,
      company_id: input.companyId ?? null,
      created_by: input.actorId,
    })
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function addParticipantToSession(params: {
  sessionId: string;
  personId: string;
  jobTitle?: string | null;
  department?: string | null;
  actorId: string;
}) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_session_participants')
    .upsert(
      {
        session_id: params.sessionId,
        person_id: params.personId,
        job_title: params.jobTitle ?? null,
        department: params.department ?? null,
        status: 'inscrit',
      },
      { onConflict: 'session_id,person_id' }
    )
    .select('*')
    .single();
  if (error) throw new Error(error.message);

  await supabase.from('training_session_certificates').upsert(
    {
      session_id: params.sessionId,
      participant_id: data.id,
      status: 'a_generer',
    },
    { onConflict: 'participant_id', ignoreDuplicates: true }
  );

  await supabase.from('training_session_evaluations').upsert(
    {
      session_id: params.sessionId,
      participant_id: data.id,
      eval_type: 'chaud',
      status: 'manquante',
    },
    { onConflict: 'participant_id,eval_type', ignoreDuplicates: true }
  );

  await logSessionActivity({
    sessionId: params.sessionId,
    actorId: params.actorId,
    action: 'participant_added',
    details: { person_id: params.personId },
  });
  await refreshSessionChecklist(params.sessionId);
  return data;
}

export async function listSessionParticipants(sessionId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_session_participants')
    .select(
      `
      *,
      person:training_people(*)
    `
    )
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function removeParticipant(participantId: string, actorId: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('training_session_participants')
    .select('session_id')
    .eq('id', participantId)
    .maybeSingle();
  if (!data) return;
  const { error } = await supabase
    .from('training_session_participants')
    .delete()
    .eq('id', participantId);
  if (error) throw new Error(error.message);
  await logSessionActivity({
    sessionId: data.session_id,
    actorId,
    action: 'participant_removed',
    details: { participant_id: participantId },
  });
  await refreshSessionChecklist(data.session_id);
}

export async function generateConvocationsForSession(sessionId: string, actorId: string) {
  const supabase = createAdminClient();
  const participants = await listSessionParticipants(sessionId);
  let created = 0;
  for (const p of participants) {
    if (p.status === 'annule') continue;
    const person = p.person as { first_name: string; last_name: string };
    const title = `Convocation — ${person.first_name} ${person.last_name}`;
    const { data: existing } = await supabase
      .from('training_session_documents')
      .select('id')
      .eq('session_id', sessionId)
      .eq('participant_id', p.id)
      .eq('category', 'convocation')
      .maybeSingle();
    if (existing) continue;
    await supabase.from('training_session_documents').insert({
      session_id: sessionId,
      participant_id: p.id,
      category: 'convocation',
      title,
      status: 'genere',
      created_by: actorId,
    });
    created += 1;
  }
  await logSessionActivity({
    sessionId,
    actorId,
    action: 'convocations_generated',
    details: { count: created },
  });
  await refreshSessionChecklist(sessionId);
  return created;
}

export async function generateCertificatesForSession(sessionId: string, actorId: string) {
  const supabase = createAdminClient();
  const participants = await listSessionParticipants(sessionId);
  let updated = 0;
  for (const p of participants) {
    if (p.status === 'annule') continue;
    const { error } = await supabase.from('training_session_certificates').upsert(
      {
        session_id: sessionId,
        participant_id: p.id,
        status: 'generee',
        generated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'participant_id' }
    );
    if (!error) updated += 1;

    const person = p.person as { first_name: string; last_name: string };
    await supabase.from('training_session_documents').upsert(
      {
        session_id: sessionId,
        participant_id: p.id,
        category: 'attestation',
        title: `Attestation — ${person.first_name} ${person.last_name}`,
        status: 'genere',
        created_by: actorId,
      },
      { onConflict: 'id', ignoreDuplicates: true }
    );
  }
  await logSessionActivity({
    sessionId,
    actorId,
    action: 'certificates_generated',
    details: { count: updated },
  });
  await refreshSessionChecklist(sessionId);
  return updated;
}
