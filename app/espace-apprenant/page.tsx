import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getProfile } from '@/lib/auth';
import { SessionLogger } from '@/components/SessionLogger';
import { ApprenantShell } from '@/components/espace-apprenant/ApprenantShell';
import { ApprenantFormationsBoard } from '@/components/espace-apprenant/ApprenantFormationsBoard';
import { getApprenantFormations } from '@/lib/espace-apprenant-formations';

export default async function EspaceApprenantPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/connexion?next=/espace-apprenant');

  const profile = await getProfile(user.id);
  const formations = await getApprenantFormations(user.id);

  const firstName =
    profile?.full_name?.trim().split(/\s+/)[0] ||
    user.email?.split('@')[0] ||
    'apprenant';

  return (
    <ApprenantShell
      firstName={firstName}
      email={user.email}
      courses={formations.map((f) => ({ slug: f.slug, title: f.title })).filter((c) => c.slug)}
    >
      <SessionLogger />
      <ApprenantFormationsBoard firstName={firstName} formations={formations} />
    </ApprenantShell>
  );
}
