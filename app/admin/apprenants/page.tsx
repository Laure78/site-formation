import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { InviterForm } from './InviterForm';
import { ImportApprenantsForm } from './ImportApprenantsForm';

export default async function AdminApprenantsPage() {
  const supabase = await createClient();
  const [{ data: profiles }, { data: courses }, { data: enrollments }, { data: lastSessions }] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, first_name, last_name, full_name, email, created_at')
      .eq('role', 'apprenant')
      .order('created_at', { ascending: false }),
    supabase.from('courses').select('id, title').eq('published', true).order('title'),
    supabase.from('enrollments').select('user_id, course_id, progress_percent, courses(title)'),
    supabase.from('session_logs').select('user_id, started_at').order('started_at', { ascending: false }),
  ]);

  const lastActivityByUser: Record<string, string> = {};
  for (const s of lastSessions ?? []) {
    if (!lastActivityByUser[s.user_id]) lastActivityByUser[s.user_id] = s.started_at;
  }

  const enrollmentsByUser: Record<string, { title: string; progress: number }[]> = {};
  const maxProgressByUser: Record<string, number> = {};
  for (const e of enrollments ?? []) {
    const c = e.courses as { title?: string } | { title?: string }[] | null | undefined;
    const title = (Array.isArray(c) ? c[0]?.title : c?.title) ?? 'Formation';
    if (!enrollmentsByUser[e.user_id]) enrollmentsByUser[e.user_id] = [];
    enrollmentsByUser[e.user_id].push({ title, progress: e.progress_percent });
    maxProgressByUser[e.user_id] = Math.max(maxProgressByUser[e.user_id] ?? 0, e.progress_percent ?? 0);
  }

  const getStatut = (userId: string) => {
    const max = maxProgressByUser[userId] ?? 0;
    if (max >= 100) return { label: 'Terminé', color: 'text-emerald-600 bg-emerald-50' };
    const last = lastActivityByUser[userId];
    if (last) return { label: 'Actif', color: 'text-blue-600 bg-blue-50' };
    return { label: 'Inactif', color: 'text-slate-500 bg-slate-50' };
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">Apprenants</h1>
      <p className="mt-2 text-slate-600">Liste des inscrits et leur progression</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {(courses ?? []).length > 0 && <InviterForm courses={courses ?? []} />}
        <ImportApprenantsForm courses={courses ?? []} />
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Nom</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Formation</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Progression</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Dernière connexion</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Statut</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(profiles ?? []).length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  Aucun apprenant inscrit
                </td>
              </tr>
            ) : (
              (profiles ?? []).flatMap((p) => {
                const myEnrollments = enrollmentsByUser[p.id] ?? [];
                const statut = getStatut(p.id);
                const lastAct = lastActivityByUser[p.id]
                  ? new Date(lastActivityByUser[p.id]).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
                  : '—';
                const name = [(p as { first_name?: string }).first_name, (p as { last_name?: string }).last_name].filter(Boolean).join(' ') || (p as { full_name?: string }).full_name || '—';

                if (myEnrollments.length === 0) {
                  return (
                    <tr key={p.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-6 py-4">
                        <Link href={`/admin/apprenants/${p.id}`} className="font-medium text-slate-900 hover:text-[var(--accent)]">
                          {name}
                        </Link>
                        <p className="text-xs text-slate-500">Inscrit le {new Date(p.created_at).toLocaleDateString('fr-FR')}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{p.email}</td>
                      <td className="px-6 py-4 text-slate-400">—</td>
                      <td className="px-6 py-4">—</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{lastAct}</td>
                      <td className="px-6 py-4"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statut.color}`}>{statut.label}</span></td>
                      <td className="px-6 py-4">
                        <Link href={`/admin/apprenants/${p.id}`} className="text-sm text-[var(--accent)] hover:underline">Profil</Link>
                      </td>
                    </tr>
                  );
                }
                return myEnrollments.map((e, i) => (
                  <tr key={`${p.id}-${i}`} className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-4">
                      {i === 0 ? (
                        <>
                          <Link href={`/admin/apprenants/${p.id}`} className="font-medium text-slate-900 hover:text-[var(--accent)]">{name}</Link>
                          <p className="text-xs text-slate-500">Inscrit le {new Date(p.created_at).toLocaleDateString('fr-FR')}</p>
                        </>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{i === 0 ? p.email : null}</td>
                    <td className="px-6 py-4 text-sm">{e.title}</td>
                    <td className="px-6 py-4 font-medium">{e.progress}%</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{i === 0 ? lastAct : null}</td>
                    <td className="px-6 py-4">{i === 0 ? <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statut.color}`}>{statut.label}</span> : null}</td>
                    <td className="px-6 py-4">
                      {i === 0 ? (
                        <Link href={`/admin/apprenants/${p.id}`} className="text-sm text-[var(--accent)] hover:underline">Profil</Link>
                      ) : null}
                    </td>
                  </tr>
                ));
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
