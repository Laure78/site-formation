import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import Link from 'next/link';
import { User, BookOpen, ChevronLeft } from 'lucide-react';
import { ResetProgressionButton } from './ResetProgressionButton';
import { SupprimerInscriptionButton } from './SupprimerInscriptionButton';
import { SatisfactionJ1TestButton } from './SatisfactionJ1TestButton';
import { formatSatisfactionReminderAdminLabel } from '@/lib/satisfaction-reminder-logic';

export default async function AdminApprenantProfilPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, first_name, last_name, email, created_at, role, account_status')
    .eq('id', id)
    .single();

  if (!profile) notFound();
  // Autoriser la vue pour tout utilisateur inscrit (y compris admin/formateur en formation)

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(
      'id, course_id, progress_percent, created_at, status, courses(id, title, slug, duration_hours, session_ends_on, session_cancelled)'
    )
    .eq('user_id', id);

  const enrollmentIds = (enrollments ?? []).map((e) => e.id as string);
  const { data: emailEvents } =
    enrollmentIds.length > 0
      ? await supabase
          .from('enrollment_email_events')
          .select('enrollment_id, status, sent_at, last_error')
          .eq('email_type', 'satisfaction_j1')
          .in('enrollment_id', enrollmentIds)
      : { data: [] };

  const eventByEnrollment = Object.fromEntries(
    (emailEvents ?? []).map((ev) => [ev.enrollment_id as string, ev])
  );

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

  const adminDb = createAdminClient();
  const emailKey = profile.email?.trim().toLowerCase() ?? '';
  const { data: invitationsRaw } = emailKey
    ? await adminDb
        .from('invitations')
        .select(
          'id, status, formation_id, created_at, last_sent_at, opened_at, accepted_at, sent_count, expires_at',
        )
        .or(`user_id.eq.${id},email.eq.${emailKey}`)
        .order('created_at', { ascending: false })
        .limit(20)
    : { data: [] };

  const formationIds = [
    ...new Set((invitationsRaw ?? []).map((i) => i.formation_id).filter(Boolean)),
  ] as string[];
  const { data: inviteCourses } =
    formationIds.length > 0
      ? await adminDb.from('courses').select('id, title').in('id', formationIds)
      : { data: [] };
  const titleByCourse = Object.fromEntries((inviteCourses ?? []).map((c) => [c.id, c.title]));
  const invitations = (invitationsRaw ?? []).map((inv) => ({
    ...inv,
    courseTitle: titleByCourse[inv.formation_id as string] ?? 'Formation',
  }));

  const accountStatus = (profile as { account_status?: string }).account_status ?? 'active';
  const compteCree = accountStatus === 'active';

  const name = [profile.first_name, profile.last_name].filter(Boolean).join(' ') || profile.full_name || profile.email || '—';

  const fmtDt = (iso: string | null | undefined) =>
    iso
      ? new Date(iso).toLocaleString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '—';

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

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-slate-900">Accès plateforme</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Compte créé</dt>
            <dd className="font-medium text-slate-900">{compteCree ? 'Oui' : 'Non'}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Statut compte</dt>
            <dd className="font-medium text-slate-900">{accountStatus}</dd>
          </div>
        </dl>
        {(invitations ?? []).length > 0 ? (
          <ul className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-100">
            {invitations.map((inv) => {
              return (
                <li key={inv.id as string} className="px-4 py-3 text-sm">
                  <p className="font-medium text-slate-900">{inv.courseTitle}</p>
                  <p className="mt-1 text-slate-600">
                    Statut : {inv.status as string} · Envoyée : {fmtDt(inv.last_sent_at ?? inv.created_at)}{' '}
                    · Consultée : {inv.opened_at ? fmtDt(inv.opened_at as string) : 'Non'}
                    {inv.accepted_at ? ` · Compte activé : ${fmtDt(inv.accepted_at as string)}` : ''}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-slate-500">Aucune invitation enregistrée pour cet apprenant.</p>
        )}
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
              const courseMeta = c as {
                title?: string;
                slug?: string;
                session_ends_on?: string | null;
                session_cancelled?: boolean;
              } | null;
              const ev = eventByEnrollment[e.id] as
                | { status?: string; sent_at?: string | null; last_error?: string | null }
                | undefined;
              const reminder = formatSatisfactionReminderAdminLabel({
                sessionEndsOn: courseMeta?.session_ends_on ?? null,
                sessionCancelled: Boolean(courseMeta?.session_cancelled),
                enrollmentStatus: (e as { status?: string }).status || 'active',
                eventStatus: (ev?.status as 'pending' | 'sending' | 'sent' | 'failed' | null) ?? null,
                sentAt: ev?.sent_at ?? null,
                lastError: ev?.last_error ?? null,
              });
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
                    <div className="flex flex-wrap items-center gap-3">
                      <Link href="/admin/progression" className="text-sm font-medium text-[var(--accent)] hover:underline">
                        Voir détail
                      </Link>
                      <ResetProgressionButton userId={id} courseId={e.course_id} courseTitle={title} />
                      <SupprimerInscriptionButton userId={id} courseId={e.course_id} courseTitle={title} />
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
                  <div className="mt-4 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-700">Satisfaction — relance J+1</p>
                    <p
                      className={`mt-1 text-sm ${
                        reminder.tone === 'ok'
                          ? 'text-emerald-700'
                          : reminder.tone === 'error'
                            ? 'text-rose-700'
                            : 'text-slate-600'
                      }`}
                    >
                      {reminder.tone === 'ok' ? '✅ ' : reminder.tone === 'error' ? '⚠️ ' : '⏳ '}
                      {reminder.label}
                    </p>
                    <SatisfactionJ1TestButton enrollmentId={e.id} />
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
