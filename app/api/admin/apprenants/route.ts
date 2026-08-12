import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAccess, adminAccessDeniedMessage } from '@/lib/admin-access';
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

  const access = await requireAdminAccess();
  if (!access.ok) {
    const status = access.reason === 'unauthenticated' ? 401 : 403;
    return NextResponse.json({ error: adminAccessDeniedMessage(access.reason) }, { status });
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

  const result = await inviteOrResendApprenant(parsed.data, access.userId);
  if (!result.ok) {
    const status =
      result.code === 'not_found'
        ? 404
        : result.code === 'email'
          ? 502
          : result.code === 'forbidden'
            ? 403
            : 400;
    // Messages déjà génériques côté lib ; pas de détail infra
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
