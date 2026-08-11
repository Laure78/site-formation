import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getProfile, isAdmin } from '@/lib/auth';
import { syncCatalogueFormationsToLms } from '@/lib/sync-catalogue-lms';

/** Synchronise les 6 formations `/formations` vers la plateforme LMS. */
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }
  const profile = await getProfile(user.id);
  if (!profile || !isAdmin(profile.role)) {
    return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 });
  }

  const { results, errors } = await syncCatalogueFormationsToLms(supabase, {
    creatorId: user.id,
  });

  return NextResponse.json({
    ok: errors.length === 0,
    created: results.filter((r) => r.action === 'created').length,
    updated: results.filter((r) => r.action === 'updated').length,
    results,
    errors,
  });
}

export async function GET(request: Request) {
  // Lien pratique en local : GET = même sync + redirect admin
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    const login = new URL('/auth/connexion', request.url);
    login.searchParams.set('next', '/api/admin/sync-catalogue-lms');
    return NextResponse.redirect(login);
  }
  const profile = await getProfile(user.id);
  if (!profile || !isAdmin(profile.role)) {
    return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 });
  }

  await syncCatalogueFormationsToLms(supabase, { creatorId: user.id });
  return NextResponse.redirect(new URL('/admin/formations', request.url));
}
