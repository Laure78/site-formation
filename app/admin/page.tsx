import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Users, BookOpen, TrendingUp, Euro, MessageCircle, Clock, Target } from 'lucide-react';
import { DashboardCharts } from './DashboardCharts';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: studentsCount },
    { count: coursesCount },
    { data: enrollments },
    { data: payments },
    sessionLogsResult,
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'apprenant'),
    supabase.from('courses').select('*', { count: 'exact', head: true }),
    supabase.from('enrollments').select('id, user_id, course_id, progress_percent, created_at'),
    supabase.from('payments').select('amount_cents, status').eq('status', 'succeeded'),
    supabase.from('session_logs').select('user_id, duration_seconds, started_at'),
  ]);

  const revenue = (payments ?? []).reduce((s, p) => s + (p.amount_cents ?? 0), 0) / 100;

  const enrollmentsList = enrollments ?? [];
  const totalProgress = enrollmentsList.reduce((s, e) => s + (e.progress_percent ?? 0), 0);
  const avgCompletion = enrollmentsList.length > 0
    ? Math.round(totalProgress / enrollmentsList.length)
    : 0;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const activeUserIds = new Set(
    (sessionLogsResult.data ?? [])
      .filter((s) => new Date(s.started_at) >= thirtyDaysAgo)
      .map((s) => s.user_id)
  );
  const activeCount = activeUserIds.size;

  const totalSeconds = (sessionLogsResult.data ?? [])
    .filter((s) => s.duration_seconds != null)
    .reduce((s, x) => s + (x.duration_seconds ?? 0), 0);
  const avgTimeMinutes = (sessionLogsResult.data ?? []).filter((s) => s.duration_seconds != null).length > 0
    ? Math.round(totalSeconds / (sessionLogsResult.data ?? []).filter((s) => s.duration_seconds != null).length / 60)
    : 0;

  const stats = [
    { label: 'Apprenants', value: studentsCount ?? 0, icon: Users, color: 'bg-blue-100 text-blue-700' },
    { label: 'Apprenants actifs (30j)', value: activeCount, icon: Users, color: 'bg-sky-100 text-sky-700' },
    { label: 'Formations', value: coursesCount ?? 0, icon: BookOpen, color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Inscriptions', value: enrollments?.length ?? 0, icon: TrendingUp, color: 'bg-amber-100 text-amber-700' },
    { label: 'Taux complétion moyen', value: `${avgCompletion}%`, icon: Target, color: 'bg-violet-100 text-violet-700' },
    { label: 'Temps moyen (min)', value: avgTimeMinutes, icon: Clock, color: 'bg-rose-100 text-rose-700' },
    { label: 'Revenus (€)', value: revenue.toFixed(0), icon: Euro, color: 'bg-slate-100 text-slate-700' },
  ];

  const { data: recentEnrollments } = await supabase
    .from('enrollments')
    .select('id, created_at, progress_percent, user_id, course_id, courses(title)')
    .order('created_at', { ascending: false })
    .limit(6);

  const userIds = [...new Set((recentEnrollments ?? []).map((e: { user_id: string }) => e.user_id))];
  const { data: profiles } = userIds.length > 0
    ? await supabase.from('profiles').select('id, full_name, first_name, last_name, email').in('id', userIds)
    : { data: [] };
  const profilesMap = Object.fromEntries((profiles ?? []).map((p: { id: string }) => [p.id, p]));

  const completionByCourse: Record<string, number[]> = {};
  for (const e of enrollments ?? []) {
    const c = e.course_id as string;
    if (!completionByCourse[c]) completionByCourse[c] = [];
    completionByCourse[c].push(e.progress_percent ?? 0);
  }
  const { data: coursesForChart } = await supabase.from('courses').select('id, title');
  const completionData = (coursesForChart ?? [])
    .filter((c) => completionByCourse[c.id]?.length)
    .map((c) => ({
      title: c.title,
      avg: Math.round(
        completionByCourse[c.id].reduce((a, b) => a + b, 0) / completionByCourse[c.id].length
      ),
      count: completionByCourse[c.id].length,
    }))
    .slice(0, 6);

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-600">Vue d&apos;ensemble de la plateforme</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
              <Icon size={24} strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-sm text-slate-600">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-slate-900">Taux de complétion par formation</h2>
          <DashboardCharts data={completionData} />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-slate-900">Dernières inscriptions</h2>
          <div className="mt-4 space-y-3">
            {(recentEnrollments ?? []).length === 0 ? (
              <p className="text-sm text-slate-500">Aucune inscription pour l&apos;instant</p>
            ) : (
              (recentEnrollments ?? []).map((e: { id: string; user_id: string; progress_percent: number; courses?: { title?: string } | { title?: string }[] | null }) => {
                const p = profilesMap[e.user_id] as { full_name?: string; first_name?: string; last_name?: string; email?: string } | undefined;
                const name = [p?.first_name, p?.last_name].filter(Boolean).join(' ') || p?.full_name || p?.email || '—';
                const c = e.courses;
                const title = (Array.isArray(c) ? c[0]?.title : c?.title) ?? 'Formation';
                return (
                  <Link
                    key={e.id}
                    href={`/admin/apprenants/${e.user_id}`}
                    className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 hover:bg-slate-50 -mx-2 px-2 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{name}</p>
                      <p className="text-xs text-slate-500">{title}</p>
                    </div>
                    <span className="text-sm font-medium text-slate-700">{e.progress_percent}%</span>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-slate-900">Actions rapides</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/admin/formations/nouveau"
              className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                <BookOpen size={20} strokeWidth={1.5} />
              </div>
              <span className="font-medium">Créer une formation</span>
            </Link>
            <Link
              href="/admin/formations"
              className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <BookOpen size={20} strokeWidth={1.5} />
              </div>
              <span className="font-medium">Gérer les formations</span>
            </Link>
            <Link
              href="/admin/apprenants"
              className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <Users size={20} strokeWidth={1.5} />
              </div>
              <span className="font-medium">Voir les apprenants</span>
            </Link>
            <Link
              href="/admin/progression"
              className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <TrendingUp size={20} strokeWidth={1.5} />
              </div>
              <span className="font-medium">Suivi progression</span>
            </Link>
            <Link
              href="/admin/qualite"
              className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <Target size={20} strokeWidth={1.5} />
              </div>
              <span className="font-medium">Export Qualiopi</span>
            </Link>
            <Link
              href="/messages"
              className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <MessageCircle size={20} strokeWidth={1.5} />
              </div>
              <span className="font-medium">Messages</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
