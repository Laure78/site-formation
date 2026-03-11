import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { User } from 'lucide-react';

export default async function AdminProgressionPage() {
  const supabase = await createClient();

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('id, user_id, course_id, progress_percent, created_at, courses(title, slug)')
    .order('created_at', { ascending: false });

  const { data: lessonProgress } = await supabase
    .from('lesson_progress')
    .select('user_id, lesson_id, completed, completed_at')
    .eq('completed', true);

  const completedByUser: Record<string, number> = {};
  for (const lp of lessonProgress ?? []) {
    completedByUser[lp.user_id] = (completedByUser[lp.user_id] ?? 0) + 1;
  }

  const userIds = [...new Set((enrollments ?? []).map((e: { user_id: string }) => e.user_id))];
  const { data: lastSessions } = userIds.length > 0
    ? await supabase
        .from('session_logs')
        .select('user_id, started_at')
        .in('user_id', userIds)
        .order('started_at', { ascending: false })
    : { data: [] };

  const lastActivityByUser: Record<string, string> = {};
  for (const s of lastSessions ?? []) {
    if (!lastActivityByUser[s.user_id]) {
      lastActivityByUser[s.user_id] = s.started_at;
    }
  }

  const { data: profiles } = userIds.length > 0
    ? await supabase.from('profiles').select('id, full_name, first_name, last_name, email').in('id', userIds)
    : { data: [] };
  const profilesMap = Object.fromEntries((profiles ?? []).map((p) => [p.id, p]));

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">Progression</h1>
      <p className="mt-2 text-slate-600">Suivi pédagogique des apprenants — Conformité Qualiopi</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Apprenant</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Formation</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Progression</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Leçons complétées</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Dernière activité</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(enrollments ?? []).length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  Aucune inscription pour l&apos;instant
                </td>
              </tr>
            ) : (
              (enrollments ?? []).map((e: {
                id: string;
                user_id: string;
                course_id: string;
                progress_percent: number;
                created_at: string;
                courses?: { title?: string; slug?: string } | { title?: string; slug?: string }[];
              }) => {
                const p = profilesMap[e.user_id] as { full_name?: string; first_name?: string; last_name?: string; email?: string } | undefined;
                const name = [p?.first_name, p?.last_name].filter(Boolean).join(' ') || p?.full_name || p?.email || '—';
                const c = Array.isArray(e.courses) ? e.courses[0] : e.courses;
                const title = c?.title ?? 'Formation';
                const completedCount = completedByUser[e.user_id] ?? 0;
                const lastAct = lastActivityByUser[e.user_id]
                  ? new Date(lastActivityByUser[e.user_id]).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '—';
                return (
                  <tr key={e.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                          <User size={14} strokeWidth={1.5} className="text-slate-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{name}</p>
                          <p className="text-xs text-slate-500">{p?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{title}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-[var(--accent)]"
                            style={{ width: `${e.progress_percent}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{e.progress_percent}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{completedCount}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{lastAct}</td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/apprenants/${e.user_id}`}
                        className="text-sm font-medium text-[var(--accent)] hover:underline"
                      >
                        Voir profil
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
