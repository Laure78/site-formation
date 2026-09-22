import { NextResponse } from 'next/server';
import { requireAdminAccess, adminAccessDeniedMessage } from '@/lib/admin-access';
import { createClient } from '@/lib/supabase/server';
import {
  DEFAULT_LMS_ENROLL_EMAIL,
  enrollDefaultAdminOnAllCourses,
} from '@/lib/lms-auto-enroll';
import { checkRateLimit, clientIpFromRequest } from '@/lib/rate-limit';

/**
 * POST /api/admin/enroll-laure-all
 * Inscrit laureolivie@yahoo.fr sur toutes les formations existantes.
 * Les futures formations restent couvertes par le trigger SQL + enroll à la création.
 *
 * Utilise la session admin (RLS autorise admin/formateur sur enrollments).
 * Si SUPABASE_SERVICE_ROLE_KEY est dispo, privilégie le client service role.
 */
export async function POST(request: Request) {
  const ip = clientIpFromRequest(request);
  const rl = checkRateLimit(`admin-enroll-laure:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Réessayez plus tard.' },
      { status: 429 }
    );
  }

  const access = await requireAdminAccess();
  if (!access.ok) {
    const status = access.reason === 'unauthenticated' ? 401 : 403;
    return NextResponse.json({ error: adminAccessDeniedMessage(access.reason) }, { status });
  }

  try {
    let supabase;
    try {
      const { createAdminClient } = await import('@/lib/supabase/admin');
      supabase = createAdminClient();
    } catch {
      supabase = await createClient();
    }

    const result = await enrollDefaultAdminOnAllCourses(supabase, DEFAULT_LMS_ENROLL_EMAIL);
    if (!result.ok) {
      return NextResponse.json({ error: result.error ?? 'Échec' }, { status: 500 });
    }
    return NextResponse.json({
      ok: true,
      email: DEFAULT_LMS_ENROLL_EMAIL,
      enrolled: result.enrolled,
      totalCourses: result.totalCourses,
      message: `${DEFAULT_LMS_ENROLL_EMAIL} est inscrite sur ${result.enrolled} formation(s). Les nouvelles formations seront inscrites automatiquement.`,
    });
  } catch (err) {
    console.error('[enroll-laure-all]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}
