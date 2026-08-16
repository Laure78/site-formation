'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { inviteApprenantSchema, inviteOrResendApprenant } from '@/lib/invitation';
import { parseApprenantsCsv } from '@/lib/parse-apprenants-csv';
import { checkRateLimit } from '@/lib/rate-limit';

export async function importApprenantsAction(
  csvText: string,
  courseId: string
): Promise<{ invited: number; skipped: number; errors: string[] } | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = await requireAdminAccess();
  if (!admin.ok) return null;

  const rl = checkRateLimit(`admin-import-csv:${user.id}`, 5, 10 * 60_000);
  if (!rl.ok) {
    return {
      invited: 0,
      skipped: 0,
      errors: ['Trop d’imports récents. Réessayez dans quelques minutes.'],
    };
  }

  const courseParsed = z.string().uuid().safeParse(courseId);
  if (!courseParsed.success) {
    return { invited: 0, skipped: 0, errors: ['Identifiant de formation invalide'] };
  }

  const { data: course } = await supabase
    .from('courses')
    .select('id')
    .eq('id', courseParsed.data)
    .eq('published', true)
    .maybeSingle();
  if (!course) {
    return { invited: 0, skipped: 0, errors: ['Formation introuvable ou non publiée'] };
  }

  let rows: Record<string, string>[];
  try {
    if (csvText.length > 200_000) {
      return { invited: 0, skipped: 0, errors: ['Fichier CSV trop volumineux (max 200 Ko)'] };
    }
    rows = parseApprenantsCsv(csvText);
  } catch (e) {
    return { invited: 0, skipped: 0, errors: [e instanceof Error ? e.message : 'CSV invalide'] };
  }

  if (rows.length === 0) {
    return {
      invited: 0,
      skipped: 0,
      errors: [
        'Aucune ligne de données. Le fichier doit contenir une ligne d’en-tête + au moins 1 apprenant.',
      ],
    };
  }

  const errors: string[] = [];
  let invited = 0;
  let skipped = 0;
  const seenEmails = new Set<string>();

  for (let i = 0; i < rows.length; i++) {
    const lineNo = i + 2;
    const email = (rows[i].email ?? rows[i].mail ?? '').trim().toLowerCase();
    const firstName = (
      rows[i].prenom ??
      rows[i].first_name ??
      rows[i].firstname ??
      'Apprenant'
    ).trim();
    const lastName = (
      rows[i].nom ??
      rows[i].last_name ??
      rows[i].lastname ??
      '—'
    ).trim();

    if (!email) {
      errors.push(`Ligne ${lineNo} : email manquant`);
      continue;
    }
    if (seenEmails.has(email)) {
      errors.push(`Ligne ${lineNo} : email en doublon dans le fichier (${email})`);
      continue;
    }
    seenEmails.add(email);

    const parsed = inviteApprenantSchema.safeParse({
      email,
      firstName: firstName || 'Apprenant',
      lastName: lastName || '—',
      formationId: courseParsed.data,
      action: 'create',
    });
    if (!parsed.success) {
      errors.push(`Ligne ${lineNo} : ${parsed.error.issues[0]?.message ?? 'données invalides'}`);
      continue;
    }

    const result = await inviteOrResendApprenant(parsed.data, admin.userId);

    if (!result.ok) {
      errors.push(`Ligne ${lineNo} (${email}) : ${result.error}`);
    } else if (result.status === 'cree') {
      invited++;
    } else if (result.status === 'deja_invite') {
      skipped++;
      errors.push(`Ligne ${lineNo} : déjà invité (${email}) — invitation en attente`);
    }
  }

  return { invited, skipped, errors };
}

/** Server action — renvoi d’invitation (équivalent API action=resend). */
export async function resendInvitationAction(input: {
  email: string;
  firstName: string;
  lastName: string;
  formationId: string;
  invitationId: string;
}): Promise<{ ok: true; status: string } | { ok: false; error: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Non authentifié' };
  const admin = await requireAdminAccess();
  if (!admin.ok) return { ok: false, error: 'Non autorisé' };

  const parsed = inviteApprenantSchema.safeParse({
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    formationId: input.formationId,
    action: 'resend',
    invitationId: input.invitationId,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Données invalides' };
  }

  const result = await inviteOrResendApprenant(parsed.data, admin.userId);
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true, status: result.status };
}

export async function getApprenantsCsv(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = await requireAdminAccess();
  if (!admin.ok) return null;

  function csvEscape(val: string | number | null | undefined): string {
    if (val == null) return '';
    const s = String(val);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) return `"${s.replace(/"/g, '""')}"`;
    return s;
  }

  const [{ data: profiles }, { data: enrollments }, { data: lastSessions }] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, first_name, last_name, full_name, email, created_at')
      .eq('role', 'apprenant')
      .order('created_at', { ascending: false }),
    supabase.from('enrollments').select('user_id, course_id, progress_percent, created_at, courses(title)'),
    supabase.from('session_logs').select('user_id, started_at').order('started_at', { ascending: false }),
  ]);

  const lastByUser: Record<string, string> = {};
  for (const s of lastSessions ?? []) {
    if (!lastByUser[s.user_id]) lastByUser[s.user_id] = s.started_at;
  }
  const maxProgress: Record<string, number> = {};
  for (const e of enrollments ?? []) {
    maxProgress[e.user_id] = Math.max(maxProgress[e.user_id] ?? 0, e.progress_percent ?? 0);
  }
  const getStatut = (uid: string) =>
    (maxProgress[uid] ?? 0) >= 100 ? 'Terminé' : lastByUser[uid] ? 'Actif' : 'Inactif';

  const enrollmentsList = enrollments ?? [];
  const rows = [
    ['Nom', 'Email', 'Formation', 'Progression %', 'Dernière connexion', 'Statut', 'Date inscription'],
    ...enrollmentsList.map(
      (e: {
        user_id: string;
        progress_percent: number;
        created_at: string;
        courses?: { title?: string } | { title?: string }[];
      }) => {
        const p = (profiles ?? []).find((x) => x.id === e.user_id);
        const name =
          [p?.first_name, p?.last_name].filter(Boolean).join(' ') || p?.full_name || p?.email || '—';
        const c = Array.isArray(e.courses) ? e.courses[0] : e.courses;
        const last = lastByUser[e.user_id]
          ? new Date(lastByUser[e.user_id]).toLocaleDateString('fr-FR')
          : '—';
        return [
          name,
          p?.email ?? '',
          c?.title ?? 'Formation',
          String(e.progress_percent),
          last,
          getStatut(e.user_id),
          new Date(e.created_at).toLocaleDateString('fr-FR'),
        ];
      }
    ),
  ];
  if (enrollmentsList.length === 0 && (profiles ?? []).length > 0) {
    for (const p of profiles ?? []) {
      const name =
        [p.first_name, p.last_name].filter(Boolean).join(' ') || p.full_name || p.email || '—';
      rows.push([
        name,
        p.email ?? '',
        '—',
        '0',
        '—',
        getStatut(p.id),
        new Date(p.created_at).toLocaleDateString('fr-FR'),
      ]);
    }
  }
  return rows.map((r) => r.map(csvEscape).join(',')).join('\n');
}

export async function resetProgressionAction(userId: string, courseId: string): Promise<boolean> {
  const ids = z.object({ userId: z.string().uuid(), courseId: z.string().uuid() }).safeParse({
    userId,
    courseId,
  });
  if (!ids.success) return false;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const admin = await requireAdminAccess();
  if (!admin.ok) return false;

  const { data: modules } = await supabase.from('modules').select('id').eq('course_id', ids.data.courseId);
  const moduleIds = (modules ?? []).map((m) => m.id);
  const { data: lessons } =
    moduleIds.length > 0
      ? await supabase.from('lessons').select('id').in('module_id', moduleIds)
      : { data: [] };

  const lessonIds = (lessons ?? []).map((l) => l.id);
  if (lessonIds.length > 0) {
    await supabase.from('lesson_progress').delete().eq('user_id', ids.data.userId).in('lesson_id', lessonIds);
  }
  await supabase
    .from('enrollments')
    .update({ progress_percent: 0 })
    .eq('user_id', ids.data.userId)
    .eq('course_id', ids.data.courseId);
  return true;
}

export async function supprimerInscriptionAction(userId: string, courseId: string): Promise<boolean> {
  const ids = z.object({ userId: z.string().uuid(), courseId: z.string().uuid() }).safeParse({
    userId,
    courseId,
  });
  if (!ids.success) return false;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const admin = await requireAdminAccess();
  if (!admin.ok) return false;

  const { data: modules } = await supabase.from('modules').select('id').eq('course_id', ids.data.courseId);
  const moduleIds = (modules ?? []).map((m) => m.id);
  const { data: lessons } =
    moduleIds.length > 0
      ? await supabase.from('lessons').select('id').in('module_id', moduleIds)
      : { data: [] };
  const lessonIds = (lessons ?? []).map((l) => l.id);

  if (lessonIds.length > 0) {
    await supabase.from('lesson_progress').delete().eq('user_id', ids.data.userId).in('lesson_id', lessonIds);
  }
  await supabase.from('enrollments').delete().eq('user_id', ids.data.userId).eq('course_id', ids.data.courseId);
  return true;
}
