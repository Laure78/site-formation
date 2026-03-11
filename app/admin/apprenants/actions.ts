'use server';

import { createClient } from '@/lib/supabase/server';
import { isAdmin } from '@/lib/auth';
import { randomUUID } from 'crypto';

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].match(/("([^"]*)")|([^,\n]+)/g)?.map((v) => v.replace(/^"|"$/g, '').trim()) ?? [];
    const row: Record<string, string> = {};
    headers.forEach((h, j) => { row[h] = values[j] ?? ''; });
    rows.push(row);
  }
  return rows;
}

export async function importApprenantsAction(
  csvText: string,
  courseId: string
): Promise<{ invited: number; errors: string[] } | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) return null;

  const rows = parseCsv(csvText);
  const errors: string[] = [];
  let invited = 0;

  for (let i = 0; i < rows.length; i++) {
    const email = (rows[i].email ?? rows[i].mail ?? '').trim().toLowerCase();
    if (!email) { errors.push(`Ligne ${i + 2} : email manquant`); continue; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errors.push(`Ligne ${i + 2} : email invalide`); continue; }

    const token = randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const { error } = await supabase.from('invitations').insert({
      email,
      course_id: courseId,
      token,
      expires_at: expiresAt.toISOString(),
      invited_by: user.id,
    });
    if (error) {
      if (error.code === '23505') errors.push(`Ligne ${i + 2} : invitation déjà existante pour ${email}`);
      else errors.push(`Ligne ${i + 2} : ${error.message}`);
    } else {
      invited++;
    }
  }

  return { invited, errors };
}

export async function createInvitationAction(
  email: string,
  courseId: string
): Promise<{ url: string } | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) return null;

  const token = randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const { error } = await supabase.from('invitations').insert({
    email,
    course_id: courseId,
    token,
    expires_at: expiresAt.toISOString(),
    invited_by: user.id,
  });

  if (error) return null;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    'https://www.laureolivie.fr';
  const url = `${baseUrl}/invitation/${token}`;
  return { url };
}

export async function getApprenantsCsv(): Promise<string | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) return null;

  function csvEscape(val: string | number | null | undefined): string {
    if (val == null) return '';
    const s = String(val);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) return `"${s.replace(/"/g, '""')}"`;
    return s;
  }

  const [{ data: profiles }, { data: enrollments }, { data: lastSessions }] = await Promise.all([
    supabase.from('profiles').select('id, first_name, last_name, full_name, email, created_at').eq('role', 'apprenant').order('created_at', { ascending: false }),
    supabase.from('enrollments').select('user_id, course_id, progress_percent, created_at, courses(title)'),
    supabase.from('session_logs').select('user_id, started_at').order('started_at', { ascending: false }),
  ]);

  const lastByUser: Record<string, string> = {};
  for (const s of lastSessions ?? []) { if (!lastByUser[s.user_id]) lastByUser[s.user_id] = s.started_at; }
  const maxProgress: Record<string, number> = {};
  for (const e of enrollments ?? []) { maxProgress[e.user_id] = Math.max(maxProgress[e.user_id] ?? 0, e.progress_percent ?? 0); }
  const getStatut = (uid: string) => (maxProgress[uid] ?? 0) >= 100 ? 'Terminé' : lastByUser[uid] ? 'Actif' : 'Inactif';

  const enrollmentsList = enrollments ?? [];
  const rows = [
    ['Nom', 'Email', 'Formation', 'Progression %', 'Dernière connexion', 'Statut', 'Date inscription'],
    ...enrollmentsList.map((e: { user_id: string; progress_percent: number; created_at: string; courses?: { title?: string } | { title?: string }[] }) => {
      const p = (profiles ?? []).find((x) => x.id === e.user_id);
      const name = [p?.first_name, p?.last_name].filter(Boolean).join(' ') || p?.full_name || p?.email || '—';
      const c = Array.isArray(e.courses) ? e.courses[0] : e.courses;
      const last = lastByUser[e.user_id] ? new Date(lastByUser[e.user_id]).toLocaleDateString('fr-FR') : '—';
      return [name, p?.email ?? '', c?.title ?? 'Formation', String(e.progress_percent), last, getStatut(e.user_id), new Date(e.created_at).toLocaleDateString('fr-FR')];
    }),
  ];
  if (enrollmentsList.length === 0 && (profiles ?? []).length > 0) {
    for (const p of profiles ?? []) {
      const name = [p.first_name, p.last_name].filter(Boolean).join(' ') || p.full_name || p.email || '—';
      rows.push([name, p.email ?? '', '—', '0', '—', getStatut(p.id), new Date(p.created_at).toLocaleDateString('fr-FR')]);
    }
  }
  return rows.map((r) => r.map(csvEscape).join(',')).join('\n');
}

export async function resetProgressionAction(userId: string, courseId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) return false;

  const { data: modules } = await supabase.from('modules').select('id').eq('course_id', courseId);
  const moduleIds = (modules ?? []).map((m) => m.id);
  const { data: lessons } = moduleIds.length > 0
    ? await supabase.from('lessons').select('id').in('module_id', moduleIds)
    : { data: [] };

  const lessonIds = (lessons ?? []).map((l) => l.id);
  if (lessonIds.length > 0) {
    await supabase.from('lesson_progress').delete().eq('user_id', userId).in('lesson_id', lessonIds);
  }
  await supabase.from('enrollments').update({ progress_percent: 0 }).eq('user_id', userId).eq('course_id', courseId);
  return true;
}

export async function supprimerInscriptionAction(userId: string, courseId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) return false;

  const { data: modules } = await supabase.from('modules').select('id').eq('course_id', courseId);
  const moduleIds = (modules ?? []).map((m) => m.id);
  const { data: lessons } = moduleIds.length > 0 ? await supabase.from('lessons').select('id').in('module_id', moduleIds) : { data: [] };
  const lessonIds = (lessons ?? []).map((l) => l.id);

  if (lessonIds.length > 0) await supabase.from('lesson_progress').delete().eq('user_id', userId).in('lesson_id', lessonIds);
  await supabase.from('enrollments').delete().eq('user_id', userId).eq('course_id', courseId);
  return true;
}
