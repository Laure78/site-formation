import { NextResponse } from 'next/server';
import { requireAdminAccess, adminAccessDeniedMessage } from '@/lib/admin-access';
import { syncCatalogueFormationsToLms } from '@/lib/sync-catalogue-lms';
import { createClient } from '@/lib/supabase/server';

/** Synchronise les 5 formations `/formations` vers la plateforme LMS. */
export async function POST() {
  const access = await requireAdminAccess();
  if (!access.ok) {
    const status = access.reason === 'unauthenticated' ? 401 : 403;
    return NextResponse.json({ error: adminAccessDeniedMessage(access.reason) }, { status });
  }

  const supabase = await createClient();
  const { results, errors } = await syncCatalogueFormationsToLms(supabase, {
    creatorId: access.userId,
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
  const access = await requireAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      const login = new URL('/auth/connexion', request.url);
      login.searchParams.set('next', '/api/admin/sync-catalogue-lms');
      return NextResponse.redirect(login);
    }
    return NextResponse.json({ error: adminAccessDeniedMessage(access.reason) }, { status: 403 });
  }

  const supabase = await createClient();
  await syncCatalogueFormationsToLms(supabase, { creatorId: access.userId });
  return NextResponse.redirect(new URL('/admin/formations', request.url));
}
