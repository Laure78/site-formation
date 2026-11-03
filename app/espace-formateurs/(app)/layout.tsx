import { redirect } from 'next/navigation';
import { FormateurShell } from '@/components/espace-formateurs/FormateurShell';
import {
  extranetAccessDeniedMessage,
  requireExtranetTrainerAccess,
} from '@/lib/extranet-formateurs/access';
import { LINKS } from '@/lib/internal-links';

export default async function EspaceFormateursAppLayout({ children }: { children: React.ReactNode }) {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.espaceFormateursConnexion}?next=${encodeURIComponent('/espace-formateurs')}`);
    }
    redirect(
      `${LINKS.espaceFormateursConnexion}?error=${encodeURIComponent(extranetAccessDeniedMessage(access.reason))}`
    );
  }

  const displayName =
    [access.trainer.first_name, access.trainer.last_name].filter(Boolean).join(' ') ||
    access.email;

  return <FormateurShell displayName={displayName}>{children}</FormateurShell>;
}
