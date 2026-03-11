'use server';

import { createClient } from '@/lib/supabase/server';
import { isAdmin } from '@/lib/auth';

export async function getProgressionCsv(): Promise<string | null> {
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

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('user_id, course_id, progress_percent, created_at, courses(title)');

  const userIds = [...new Set((enrollments ?? []).map((e: { user_id: string }) => e.user_id))];
  const { data: profiles } = userIds.length > 0
    ? await supabase.from('profiles').select('id, full_name, first_name, last_name, email').in('id', userIds)
    : { data: [] };
  const profilesMap = Object.fromEntries((profiles ?? []).map((p) => [p.id, p]));

  const rows = [
    ['Apprenant', 'Email', 'Formation', 'Progression %', 'Date inscription'],
    ...(enrollments ?? []).map((e: { user_id: string; progress_percent: number; created_at: string; courses?: { title?: string } | { title?: string }[] }) => {
      const p = profilesMap[e.user_id] as { full_name?: string; first_name?: string; last_name?: string; email?: string } | undefined;
      const name = [p?.first_name, p?.last_name].filter(Boolean).join(' ') || p?.full_name || p?.email || '—';
      const c = Array.isArray(e.courses) ? e.courses[0] : e.courses;
      return [name, p?.email ?? '', c?.title ?? 'Formation', String(e.progress_percent), new Date(e.created_at).toLocaleDateString('fr-FR')];
    }),
  ];

  return rows.map((r) => r.map(csvEscape).join(',')).join('\n');
}

export async function getSatisfactionCsv(): Promise<string | null> {
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

  const { data: surveys } = await supabase
    .from('satisfaction_surveys')
    .select('user_id, course_id, note_globale, note_contenu, note_utilite, commentaire, created_at');

  const userIds = [...new Set((surveys ?? []).map((s: { user_id: string }) => s.user_id))];
  const { data: profiles } = userIds.length > 0
    ? await supabase.from('profiles').select('id, full_name, email').in('id', userIds)
    : { data: [] };
  const profilesMap = Object.fromEntries((profiles ?? []).map((p) => [p.id, p]));

  const { data: courses } = await supabase.from('courses').select('id, title');
  const coursesMap = Object.fromEntries((courses ?? []).map((c) => [c.id, c.title]));

  const rows = [
    ['Apprenant', 'Email', 'Formation', 'Note globale', 'Note contenu', 'Note utilité', 'Commentaire', 'Date'],
    ...(surveys ?? []).map((s: { user_id: string; course_id: string; note_globale?: number; note_contenu?: number; note_utilite?: number; commentaire?: string; created_at: string }) => {
      const p = profilesMap[s.user_id] as { full_name?: string; email?: string } | undefined;
      const title = coursesMap[s.course_id] ?? 'Formation';
      return [p?.full_name ?? '', p?.email ?? '', title, String(s.note_globale ?? ''), String(s.note_contenu ?? ''), String(s.note_utilite ?? ''), s.commentaire ?? '', new Date(s.created_at).toLocaleDateString('fr-FR')];
    }),
  ];

  return rows.map((r) => r.map(csvEscape).join(',')).join('\n');
}

export async function getEmargementCsv(): Promise<string | null> {
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

  const { data: signatures } = await supabase
    .from('attendance_signatures')
    .select('attendance_sheet_id, user_id, signed_at');

  if (!signatures || signatures.length === 0) {
    return ['Apprenant', 'Email', 'Formation', 'Session', 'Date session', 'Date signature'].join(',') + '\n';
  }

  const sheetIds = [...new Set(signatures.map((s: { attendance_sheet_id: string }) => s.attendance_sheet_id))];
  const { data: sheets } = await supabase.from('attendance_sheets').select('id, session_date, session_label, course_id').in('id', sheetIds);
  const sheetsMap = Object.fromEntries((sheets ?? []).map((sh) => [sh.id, sh]));

  const courseIds = [...new Set((sheets ?? []).map((sh) => sh.course_id).filter(Boolean))];
  const { data: courses } = courseIds.length > 0 ? await supabase.from('courses').select('id, title').in('id', courseIds) : { data: [] };
  const coursesMap = Object.fromEntries((courses ?? []).map((c) => [c.id, c.title]));

  const userIds = [...new Set(signatures.map((s: { user_id: string }) => s.user_id))];
  const { data: profiles } = await supabase.from('profiles').select('id, full_name, first_name, last_name, email').in('id', userIds);
  const profilesMap = Object.fromEntries((profiles ?? []).map((p) => [p.id, p]));

  const rows = [
    ['Apprenant', 'Email', 'Formation', 'Session', 'Date session', 'Date signature'],
    ...signatures.map((s: { user_id: string; attendance_sheet_id: string; signed_at: string }) => {
      const sheet = sheetsMap[s.attendance_sheet_id] as { session_date?: string; session_label?: string; course_id?: string } | undefined;
      const p = profilesMap[s.user_id] as { full_name?: string; first_name?: string; last_name?: string; email?: string } | undefined;
      const name = [p?.first_name, p?.last_name].filter(Boolean).join(' ') || p?.full_name || p?.email || '—';
      const title = sheet?.course_id ? (coursesMap[sheet.course_id] ?? 'Formation') : 'Formation';
      return [name, p?.email ?? '', title, sheet?.session_label ?? '', sheet?.session_date ?? '', new Date(s.signed_at).toLocaleString('fr-FR')];
    }),
  ];

  return rows.map((r) => r.map(csvEscape).join(',')).join('\n');
}
