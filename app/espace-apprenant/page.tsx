import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { BookOpen, Award, ChevronRight, MessageCircle } from 'lucide-react';
import { getProfile } from '@/lib/auth';

export default async function EspaceApprenantPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/connexion');

  const profile = await getProfile(user.id);
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('course_id, progress_percent, courses(slug, title)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3);

  const totalProgress = (enrollments ?? []).reduce((s, e) => s + (e.progress_percent ?? 0), 0);
  const avgProgress = (enrollments ?? []).length > 0 ? Math.round(totalProgress / enrollments!.length) : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-16">
      <h1 className="font-display text-3xl font-bold">Espace apprenant</h1>
      <p className="mt-2 text-slate-600">Bienvenue, {profile?.full_name || user.email}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Link
          href="/messages"
          className="group rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <MessageCircle size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-slate-900">Messages</h2>
                <p className="mt-1 text-sm text-slate-600">Discussion avec le formateur et les apprenants</p>
              </div>
            </div>
            <ChevronRight size={24} strokeWidth={1.5} className="text-slate-400 group-hover:text-[var(--accent)]" />
          </div>
        </Link>

        <Link
          href="/espace-apprenant/mes-formations"
          className="group rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <BookOpen size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-slate-900">Mes formations</h2>
                <p className="mt-1 text-sm text-slate-600">{(enrollments ?? []).length} formation(s) en cours</p>
              </div>
            </div>
            <ChevronRight size={24} strokeWidth={1.5} className="text-slate-400 group-hover:text-[var(--accent)]" />
          </div>
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Award size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-slate-900">Ma progression</h2>
              <p className="mt-1 text-2xl font-bold text-[var(--accent)]">{avgProgress}%</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Progression moyenne sur tes formations
          </p>
        </div>
      </div>

      {(enrollments ?? []).length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-lg font-semibold text-slate-900">Dernières formations</h2>
          <div className="mt-4 space-y-3">
            {(enrollments ?? []).map((e) => {
              const raw = e.courses as { slug?: string; title?: string } | { slug?: string; title?: string }[] | null;
              const c = Array.isArray(raw) ? raw[0] : raw;
              return (
                <Link
                  key={e.course_id}
                  href={`/espace-apprenant/cours/${c?.slug ?? ''}`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                >
                  <span className="font-medium text-slate-900">{c?.title ?? 'Formation'}</span>
                  <span className="text-sm text-slate-500">{e.progress_percent}%</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-10 flex gap-4">
        <Link
          href="/formations"
          className="rounded-xl border-2 border-[var(--accent)] px-6 py-3 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
        >
          Voir le catalogue
        </Link>
        <form action="/auth/deconnexion" method="post">
          <button
            type="submit"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Se déconnecter
          </button>
        </form>
      </div>
    </div>
  );
}
