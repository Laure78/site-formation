import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { InviterForm } from './InviterForm';

export default async function AdminApprenantsPage() {
  const supabase = await createClient();
  const [{ data: profiles }, { data: courses }] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, first_name, last_name, full_name, email, created_at')
      .eq('role', 'apprenant')
      .order('created_at', { ascending: false }),
    supabase.from('courses').select('id, title').eq('published', true).order('title'),
  ]);

  const { data: enrollments } = await supabase.from('enrollments').select('user_id, course_id, progress_percent, courses(title)');

  const enrollmentsByUser: Record<string, { title: string; progress: number }[]> = {};
  for (const e of enrollments ?? []) {
    const c = e.courses as { title?: string } | { title?: string }[] | null | undefined;
    const title = (Array.isArray(c) ? c[0]?.title : c?.title) ?? 'Formation';
    if (!enrollmentsByUser[e.user_id]) enrollmentsByUser[e.user_id] = [];
    enrollmentsByUser[e.user_id].push({ title, progress: e.progress_percent });
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">Apprenants</h1>
      <p className="mt-2 text-slate-600">Liste des inscrits et leur progression</p>

      {(courses ?? []).length > 0 && (
        <div className="mt-8">
          <InviterForm courses={courses ?? []} />
        </div>
      )}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Prénom</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Nom</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Formations</th>
            </tr>
          </thead>
          <tbody>
            {(profiles ?? []).length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  Aucun apprenant inscrit
                </td>
              </tr>
            ) : (
              (profiles ?? []).map((p) => {
                const myEnrollments = enrollmentsByUser[p.id] ?? [];
                return (
                  <tr key={p.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-4">
                      <Link href={`/admin/apprenants/${p.id}`} className="font-medium text-slate-900 hover:text-[var(--accent)]">
                        {(p as { first_name?: string }).first_name || '—'}
                      </Link>
                      <p className="text-xs text-slate-500">Inscrit le {new Date(p.created_at).toLocaleDateString('fr-FR')}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {(p as { last_name?: string }).last_name || '—'}
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
