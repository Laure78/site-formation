import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Users, BookOpen, TrendingUp, Euro } from 'lucide-react';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: studentsCount },
    { count: coursesCount },
    { data: enrollments },
    { data: payments },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'apprenant'),
    supabase.from('courses').select('*', { count: 'exact', head: true }),
    supabase.from('enrollments').select('id'),
    supabase.from('payments').select('amount_cents, status').eq('status', 'succeeded'),
  ]);

  const revenue = (payments ?? []).reduce((s, p) => s + (p.amount_cents ?? 0), 0) / 100;

  const stats = [
    { label: 'Apprenants', value: studentsCount ?? 0, icon: Users, color: 'bg-blue-100 text-blue-700' },
    { label: 'Formations', value: coursesCount ?? 0, icon: BookOpen, color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Inscriptions', value: enrollments?.length ?? 0, icon: TrendingUp, color: 'bg-amber-100 text-amber-700' },
    { label: 'Revenus (€)', value: revenue.toFixed(0), icon: Euro, color: 'bg-violet-100 text-violet-700' },
  ];

  const { data: recentEnrollments } = await supabase
    .from('enrollments')
    .select('id, created_at, progress_percent, user_id, course_id, courses(title)')
    .order('created_at', { ascending: false })
    .limit(5);

  const userIds = [...new Set((recentEnrollments ?? []).map((e: { user_id: string }) => e.user_id))];
  const { data: profiles } = userIds.length > 0
    ? await supabase.from('profiles').select('id, full_name, email').in('id', userIds)
    : { data: [] };
  const profilesMap = Object.fromEntries((profiles ?? []).map((p: { id: string; full_name?: string; email?: string }) => [p.id, p]));

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-600">Vue d&apos;ensemble de la plateforme</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          <h2 className="font-display text-lg font-semibold text-slate-900">Dernières inscriptions</h2>
          <div className="mt-4 space-y-3">
            {(recentEnrollments ?? []).length === 0 ? (
              <p className="text-sm text-slate-500">Aucune inscription pour l&apos;instant</p>
            ) : (
              (recentEnrollments ?? []).map((e: { id: string; user_id: string; progress_percent: number; courses?: { title?: string } | { title?: string }[] | null }) => {
                const p = profilesMap[e.user_id] as { full_name?: string; email?: string } | undefined;
                const name = p?.full_name || p?.email || '—';
                const c = e.courses;
                const title = (Array.isArray(c) ? c[0]?.title : c?.title) ?? 'Formation';
                return (
                  <div key={e.id} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0">
                    <div>
                      <p className="font-medium text-slate-900">{name}</p>
                      <p className="text-xs text-slate-500">{title}</p>
                    </div>
                    <span className="text-sm text-slate-500">{e.progress_percent}%</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-slate-900">Actions rapides</h2>
          <div className="mt-4 flex flex-col gap-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}
