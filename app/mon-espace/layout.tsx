import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { createClient } from '@/lib/supabase/server';
import { getProfile } from '@/lib/auth';
import { LINKS } from '@/lib/internal-links';
import { PATHNAME_HEADER } from '@/lib/middleware/pathname-header';
import { MonEspaceShell } from '@/components/mon-espace/MonEspaceShell';

export const metadata = {
  title: 'Mon espace | Laure Olivié',
  robots: { index: false, follow: false },
};

export default async function MonEspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const headerStore = await headers();
    const pathname = headerStore.get(PATHNAME_HEADER) || LINKS.monEspace;
    const next =
      pathname.startsWith(LINKS.monEspace) ? pathname : LINKS.monEspace;
    redirect(`${LINKS.authConnexion}?next=${encodeURIComponent(next)}`);
  }

  const profile = await getProfile(user.id);
  const firstName =
    profile?.full_name?.trim().split(/\s+/)[0] ||
    user.email?.split('@')[0] ||
    'là';

  return (
    <MonEspaceShell firstName={firstName} email={user.email}>
      {children}
    </MonEspaceShell>
  );
}
