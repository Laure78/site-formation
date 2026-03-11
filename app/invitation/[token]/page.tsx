import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { InvitationAcceptForm } from './InvitationAcceptForm';

export default async function InvitationPage({
  params,
}: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const supabase = await createClient();

  const { data: invitation } = await supabase
    .from('invitations')
    .select('id, email, course_id, expires_at, accepted_at')
    .eq('token', token)
    .single();

  if (!invitation) notFound();
  if (invitation.accepted_at) {
    redirect('/auth/connexion');
  }
  if (new Date(invitation.expires_at) < new Date()) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-slate-900">Lien expiré</h1>
        <p className="mt-4 text-slate-600">
          Ce lien d&apos;invitation a expiré. Contactez le formateur pour recevoir une nouvelle invitation.
        </p>
        <Link href="/" className="mt-6 inline-block text-[var(--accent)] hover:underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  const { data: course } = await supabase
    .from('courses')
    .select('id, title')
    .eq('id', invitation.course_id)
    .single();

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await supabase.from('enrollments').upsert(
      { user_id: user.id, course_id: invitation.course_id, progress_percent: 0 },
      { onConflict: 'user_id,course_id' }
    );
    await supabase
      .from('invitations')
      .update({ accepted_at: new Date().toISOString() })
      .eq('id', invitation.id);
    const { data: c } = await supabase.from('courses').select('slug').eq('id', invitation.course_id).single();
    redirect(`/espace-apprenant/cours/${c?.slug ?? ''}`);
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-slate-900">Invitation à une formation</h1>
        <p className="mt-4 text-slate-600">
          Vous avez été invité à suivre la formation <strong>{course?.title ?? 'Formation'}</strong>.
        </p>
        <p className="mt-2 text-sm text-slate-500">Email : {invitation.email}</p>
        <p className="mt-6 text-sm text-slate-600">
          Créez votre compte pour accéder à la formation.
        </p>
        <div className="mt-8">
          <InvitationAcceptForm token={token} email={invitation.email} courseId={invitation.course_id} />
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-slate-500">
        Déjà inscrit ? <Link href="/auth/connexion" className="text-[var(--accent)] hover:underline">Se connecter</Link>
      </p>
    </div>
  );
}
