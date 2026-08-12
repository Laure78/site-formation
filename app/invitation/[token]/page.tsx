import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getInvitationByToken } from '@/lib/invitation';
import { InvitationAcceptForm } from './InvitationAcceptForm';
import { RequestNewLinkForm } from './RequestNewLinkForm';

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = await createClient();
  const invitation = await getInvitationByToken(supabase, token);

  const invalid =
    !invitation ||
    invitation.status === 'revoked' ||
    invitation.status === 'accepted' ||
    (invitation.status === 'pending' && new Date(invitation.expires_at) <= new Date()) ||
    invitation.status === 'expired';

  if (invalid) {
    const expired =
      invitation &&
      (invitation.status === 'expired' ||
        (invitation.status === 'pending' && new Date(invitation.expires_at) <= new Date()));

    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          {expired ? 'Lien expiré' : 'Lien invalide'}
        </h1>
        <p className="mt-4 text-slate-600">
          {expired
            ? 'Ce lien d’invitation a expiré (valable 7 jours). Vous pouvez demander un nouveau lien.'
            : 'Ce lien d’invitation n’est plus valide. Demandez un nouveau lien si besoin.'}
        </p>
        <div className="mt-8 text-left">
          <RequestNewLinkForm />
        </div>
        <Link href="/" className="mt-8 inline-block text-[var(--accent)] hover:underline">
          Retour à l’accueil
        </Link>
      </div>
    );
  }

  let courseTitle = 'Formation';
  if (invitation.formation_id) {
    const { data: course } = await supabase
      .from('courses')
      .select('title')
      .eq('id', invitation.formation_id)
      .maybeSingle();
    if (course?.title) courseTitle = course.title;
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Créer votre mot de passe
        </h1>
        <p className="mt-4 text-slate-600">
          Accès à la formation <strong>{courseTitle}</strong>.
        </p>
        <p className="mt-2 text-sm text-slate-500">Email : {invitation.email}</p>
        <div className="mt-8">
          <InvitationAcceptForm token={token} />
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-slate-500">
        Déjà un compte actif ?{' '}
        <Link href="/auth/connexion" className="text-[var(--accent)] hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
