import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { BookOpen, ChevronRight } from 'lucide-react';

export default async function MesFormationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/connexion');

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('course_id, progress_percent, created_at, courses(id, slug, title, image_url, description)')
    .eq('user_id', user.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-16">
      <h1 className="font-display text-2xl font-bold text-slate-900">Mes formations</h1>
      <p className="mt-2 text-slate-600">Continue là où tu t&apos;es arrêté</p>

      <div className="mt-10 space-y-6">
        {(enrollments ?? []).length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <BookOpen size={48} strokeWidth={1} className="mx-auto text-slate-300" />
            <p className="mt-4 font-medium text-slate-700">Aucune formation pour l&apos;instant</p>
            <p className="mt-2 text-sm text-slate-500">Parcours le catalogue pour t&apos;inscrire à une formation</p>
            <Link href="/cours" className="mt-6 inline-block rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700">
              Voir le catalogue des cours
            </Link>
          </div>
        ) : (
          (enrollments ?? []).map((e) => {
            const c = e.courses as { id?: string; slug?: string; title?: string; image_url?: string; description?: string } | { id?: string; slug?: string; title?: string; image_url?: string; description?: string }[] | null;
            const course = Array.isArray(c) ? c[0] : c;
            return (
              <Link
                key={e.course_id}
                href={`/espace-apprenant/cours/${course?.slug ?? ''}`}
                className="flex items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                  {course?.image_url ? (
                    <img src={course.image_url} alt={`Formation ${course?.title ?? ''} — Laure Olivié`} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <BookOpen size={32} strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-lg font-semibold text-slate-900">{course?.title ?? 'Formation'}</h2>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[var(--accent)] transition-all"
                      style={{ width: `${e.progress_percent}%` }}
                    />
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {e.progress_percent}% complété
                    {e.progress_percent >= 100 && (
                      <Link href={`/espace-apprenant/attestation/${course?.id}`} className="ml-2 text-[var(--accent)] hover:underline">
                        Attestation
                      </Link>
                    )}
                  </p>
                </div>
                <ChevronRight size={24} strokeWidth={1.5} className="shrink-0 text-slate-400" />
              </Link>
            );
          })
        )}
      </div>

      <div className="mt-10">
        <Link href="/espace-apprenant" className="text-sm text-[var(--accent)] hover:underline">← Retour au dashboard</Link>
      </div>
    </div>
  );
}
