import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getProfile, isAdmin } from '@/lib/auth';
import { inviteApprenantSchema, inviteOrResendApprenant } from '@/lib/invitation';
import { checkRateLimit, clientIpFromRequest } from '@/lib/rate-limit';

/**
 * POST /api/admin/apprenants
 * Crée / renvoie une invitation apprenant (session admin uniquement).
 */
export async function POST(request: NextRequest) {
  const ip = clientIpFromRequest(request);
  const rl = checkRateLimit(`admin-apprenants:${ip}`, 30, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Réessayez plus tard.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
    );
  }

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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 });
  }

  const parsed = inviteApprenantSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Données invalides', code: 'validation' },
      { status: 400 }
    );
  }

  const result = await inviteOrResendApprenant(parsed.data, user.id);
  if (!result.ok) {
    const status =
      result.code === 'not_found' ? 404 : result.code === 'email' ? 502 : 400;
    return NextResponse.json({ error: result.error, code: result.code }, { status });
  }

  return NextResponse.json({
    ok: true,
    status: result.status,
    invitationId: result.invitationId,
    message:
      result.status === 'cree'
        ? 'Invitation créée et email envoyé.'
        : result.status === 'renvoye'
          ? 'Invitation renvoyée.'
          : 'Une invitation valide existe déjà pour cet email et cette formation.',
  });
}
