import { createClient } from '@/lib/supabase/server';
import { getProfile } from '@/lib/auth';
import { MonEspaceDashboard } from '@/components/mon-espace/MonEspaceDashboard';

export default async function MonEspacePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Auth déjà gérée par layout — fallback défensif
  const profile = user ? await getProfile(user.id) : null;
  const firstName =
    profile?.full_name?.trim().split(/\s+/)[0] ||
    user?.email?.split('@')[0] ||
    'là';

  return <MonEspaceDashboard firstName={firstName} />;
}
