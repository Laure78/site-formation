import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { User, BookOpen, ChevronLeft } from 'lucide-react';
import { ResetProgressionButton } from './ResetProgressionButton';

export default async function AdminApprenantProfilPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, first_name, last_name, email, created_at, role')
    .eq('id', id)
    .single();

  if (!profile || profile.role !== 'apprenant') notFound();

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('id, course_id, progress_percent, created_at, courses(id, title, slug, duration_hours)')
    .eq('user_id', id);

  const { data: lessonProgress } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed, completed_at')
    .eq('user_id', id)
    .eq('completed', true);

  const { data: quizAttempts } = await supabase
    .from('quiz_attempts')
    .select('lesson_id, score_percent, created_at')
    .eq('user_id', id);

  const { data: satisfaction } = await supabase
    .from('satisfaction_surveys')
    .select('course_id, note_globale, note_contenu, note_utilite, commentaire, created_at')
    .eq('user_id', id);

  const name = [profile.first_name, profile.last_name].filter(Boolean).join(' ') || profile.full_name || profile.email || '—';

  return (
    <div className="p-4 md:p-8">
      <Link
        href="/admin/apprenants"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[var(--accent)]"
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
        Retour aux apprenants
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <User size={32} strokeWidth={1.5} className="text-slate-600" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">{name}</h1>
            <p className="mt-1 text-slate-600">{profile.email}</p>
            <p className="mt-2 text-sm text-slate-500">
              Inscrit le {new Date(profile.created_at).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-slate-900">Suivi pédagogique</h2>
        <div className="mt-4 space-y-4">
          {(enrollments ?? []).length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
              Aucune formation suivie
            </p>
          ) : (
            (enrollments ?? []).map((e) => {
              const c = Array.isArray(e.courses) ? e.courses[0] : e.courses;
              const title = c?.title ?? 'Formation';
              const slug = c?.slug ?? '';
              const completedLessons = (lessonProgress ?? []).length;
              const satisfactionForCourse = (satisfaction ?? []).find((s) => s.course_id === e.course_id);
              return (
                <div
                  key={e.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                        <BookOpen size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{title}</p>
                        <p className="text-sm text-slate-500">Progression : {e.progress_percent}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link href="/admin/progression" className="text-sm font-medium text-[var(--accent)] hover:underline">
                        Voir détail
                      </Link>
                      <ResetProgressionButton userId={id} courseId={e.course_id} courseTitle={title} />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-[var(--accent)]"
                        style={{ width: `${e.progress_percent}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{e.progress_percent}%</span>
                  </div>
                  {satisfactionForCourse && (
                    <div className="mt-4 rounded-xl bg-slate-50 p-4">
                      <p className="text-sm font-medium text-slate-700">Satisfaction</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Note globale : {satisfactionForCourse.note_globale}/5 · Contenu : {satisfactionForCourse.note_contenu}/5 · Utilité : {satisfactionForCourse.note_utilite}/5
                      </p>
                      {satisfactionForCourse.commentaire && (
                        <p className="mt-2 text-sm text-slate-600 italic">&quot;{satisfactionForCourse.commentaire}&quot;</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {(quizAttempts ?? []).length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold text-slate-900">Résultats aux quiz</h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
            <ul className="space-y-2">
              {(quizAttempts ?? []).map((qa: { id?: string; score_percent: number; created_at: string }) => (
                <li key={qa.id ?? qa.created_at} className="flex items-center justify-between border-b border-slate-100 py-2 last:border-0">
                  <span className="text-slate-700">Quiz</span>
                  <span className="font-medium text-slate-900">{qa.score_percent}%</span>
                  <span className="text-sm text-slate-500">
                    {new Date(qa.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
