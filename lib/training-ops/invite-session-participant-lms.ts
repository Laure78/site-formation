import { createAdminClient } from '@/lib/supabase/admin';
import { getLmsAutomationSettings } from '@/lib/lms-automation-settings';
import { inviteOrResendApprenant } from '@/lib/invitation';

export type InviteSessionPersonToLmsResult =
  | { ok: true; status: 'cree' | 'deja_invite' | 'renvoye' | 'skipped'; detail?: string }
  | { ok: false; error: string };

function formatSessionDateFr(startsOn: string | null, endsOn: string | null): string | null {
  const key = endsOn ?? startsOn;
  if (!key) return null;
  return new Date(`${key}T12:00:00`).toLocaleDateString('fr-FR', {
    timeZone: 'Europe/Paris',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Inscrit un participant de session ops au cours LMS lié au programme,
 * envoie l’invitation (si activée) et rattache profile_id sur training_people.
 */
export async function inviteSessionPersonToLms(params: {
  sessionId: string;
  person: { id: string; email: string; first_name: string; last_name: string };
  invitedBy: string;
}): Promise<InviteSessionPersonToLmsResult> {
  const settings = await getLmsAutomationSettings();
  if (!settings.invitation_auto_enabled) {
    return { ok: true, status: 'skipped', detail: 'invitation_auto_disabled' };
  }

  const admin = createAdminClient();
  const { data: session, error: sErr } = await admin
    .from('training_sessions')
    .select('starts_on, ends_on, program:training_programs(course_id)')
    .eq('id', params.sessionId)
    .maybeSingle();

  if (sErr || !session) {
    return { ok: false, error: sErr?.message ?? 'Session introuvable' };
  }

  const program = session.program as { course_id: string | null } | null;
  const courseId = program?.course_id ?? null;
  if (!courseId) {
    return { ok: true, status: 'skipped', detail: 'no_lms_course_linked' };
  }

  const sessionDateLabel = formatSessionDateFr(
    session.starts_on as string | null,
    session.ends_on as string | null,
  );

  const result = await inviteOrResendApprenant(
    {
      email: params.person.email,
      firstName: params.person.first_name,
      lastName: params.person.last_name,
      formationId: courseId,
      action: 'create',
      sessionDateLabel: sessionDateLabel ?? undefined,
    },
    params.invitedBy,
  );

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  const email = params.person.email.trim().toLowerCase();
  const { data: profile } = await admin.from('profiles').select('id').eq('email', email).maybeSingle();
  if (profile?.id) {
    await admin
      .from('training_people')
      .update({ profile_id: profile.id, updated_at: new Date().toISOString() })
      .eq('id', params.person.id);
  }

  return { ok: true, status: result.status };
}
