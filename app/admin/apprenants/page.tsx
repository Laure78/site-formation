import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function AdminApprenantsPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, email, created_at')
    .eq('role', 'apprenant')
    .order('created_at', { ascending: false });

  const { data: enrollments } = await supabase.from('enrollments').select('user_id, course_id, progress_percent, courses(title)');

  const enrollmentsByUser: Record<string, { title: string; progress: number }[]> = {};
  for (const e of enrollments ?? []) {
    const c = e.courses as { title?: string } | { title?: string }[] | null | undefined;
    const title = (Array.isArray(c) ? c[0]?.title : c?.title) ?? 'Formation';
    if (!enrollmentsByUser[e.user_id]) enrollmentsByUser[e.user_id] = [];
    enrollmentsByUser[e.user_id].push({ title, progress: e.progress_percent });
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">Apprenants</h1>
      <p className="mt-2 text-slate-600">Liste des inscrits et leur progression</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Apprenant</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Formations</th>
            </tr>
          </thead>
          <tbody>
            {(profiles ?? []).length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                  Aucun apprenant inscrit
                </td>
              </tr>
            ) : (
              (profiles ?? []).map((p) => {
                const myEnrollments = enrollmentsByUser[p.id] ?? [];
                return (
                  <tr key={p.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{p.full_name || '—'}</p>
                      <p className="text-xs text-slate-500">Inscrit le {new Date(p.created_at).toLocaleDateString('fr-FR')}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{p.email}</td>
                    <td className="px-6 py-4">
                      {myEnrollments.length === 0 ? (
                        <span className="text-slate-400">Aucune</span>
                      ) : (
                        <ul className="space-y-1">
                          {myEnrollments.map((e, i) => (
                            <li key={i} className="text-sm">
                              {e.title} — {e.progress}%
                            </li>
                          ))}
                        </ul>
                      )}
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
