import Link from 'next/link';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { getInvitationByToken } from '@/lib/invitation';
import { InvitationAcceptForm } from './InvitationAcceptForm';
import { RequestNewLinkForm } from './RequestNewLinkForm';
import { LINKS } from '@/lib/internal-links';

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
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Ce lien d&apos;invitation n&apos;est plus valide ou a expiré.
        </h1>
        <p className="mt-4 text-slate-600">
          Les liens d&apos;invitation sont valables 7 jours et ne peuvent être utilisés qu&apos;une
          seule fois. Vous pouvez demander un nouveau lien ci-dessous, ou utiliser « Mot de passe
          oublié » si votre compte est déjà activé.
        </p>
        <div className="mt-8 text-left">
          <RequestNewLinkForm />
        </div>
        <p className="mt-6 text-sm text-slate-600">
          <Link href={LINKS.authConnexion} className="font-medium text-[var(--accent)] hover:underline">
            Mot de passe oublié / se connecter
          </Link>
        </p>
        <Link href="/" className="mt-6 inline-block text-[var(--accent)] hover:underline">
          Retour à l&apos;accueil
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
      <h1 className="font-display text-2xl font-bold text-slate-900">Créez votre mot de passe</h1>
      <p className="mt-3 text-slate-600">
        Bienvenue{invitation.first_name ? ` ${invitation.first_name}` : ''}. Activez votre accès à{' '}
        <strong>{courseTitle}</strong> en choisissant un mot de passe.
      </p>
      <div className="mt-8">
        <InvitationAcceptForm token={token} emailHint={invitation.email} />
      </div>
    </div>
  );
}
