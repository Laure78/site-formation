'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { LINKS } from '@/lib/internal-links';

/** Déconnexion admin → page de connexion prête pour revenir sur /admin. */
export async function adminSignOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(`${LINKS.authConnexion}?next=/admin`);
}
