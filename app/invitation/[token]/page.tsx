import Link from 'next/link';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { getInvitationByToken } from '@/lib/invitation';
import { InvitationAcceptForm } from './InvitationAcceptForm';
import { RequestNewLinkForm } from './RequestNewLinkForm';

/** Évite la fuite du token via Referer vers des sites tiers. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = await createClient();
  const invitation = await getInvitationByToken(supabase, token);

  // RPC ne renvoie que pending non expirée → pas de distinction état (anti-énumération)
  if (!invitation) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-slate-900">Lien invalide ou expiré</h1>
        <p className="mt-4 text-slate-600">
          Ce lien d’invitation n’est plus valide (valable 7 jours, usage unique). Vous pouvez demander un
          nouveau lien si vous avez déjà reçu une invitation.
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
      <h1 className="font-display text-2xl font-bold text-slate-900">Activer votre accès</h1>
      <p className="mt-3 text-slate-600">
        Bienvenue{invitation.first_name ? ` ${invitation.first_name}` : ''}. Choisissez un mot de passe pour
        accéder à <strong>{courseTitle}</strong>.
      </p>
      <div className="mt-8">
        <InvitationAcceptForm token={token} />
      </div>
    </div>
  );
}
