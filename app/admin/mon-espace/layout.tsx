import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';

/**
 * Section Organisation — réservée au rôle admin (+ allowlist email).
 * Les formateurs qui accèdent à /admin restent exclus ici.
 */
export default async function OrganisationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.authConnexion}?next=${LINKS.adminMonEspace}`);
    }
    redirect('/admin?organisation=denied');
  }

  return children;
}
