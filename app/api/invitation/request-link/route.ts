import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requestNewInvitationLink } from '@/lib/invitation';
import { checkRateLimit, clientIpFromRequest } from '@/lib/rate-limit';

const bodySchema = z.object({
  email: z.string().trim().email().transform((v) => v.toLowerCase()),
});

/**
 * Demande publique d’un nouveau lien d’invitation.
 * Réponse volontairement neutre (ne révèle pas si l’email existe).
 */
export async function POST(request: NextRequest) {
  const ip = clientIpFromRequest(request);
  const rl = checkRateLimit(`invitation-request:${ip}`, 5, 15 * 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: true, message: 'Si un compte correspond, un email sera envoyé.' },
      { status: 200 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: true, message: 'Si un compte correspond, un email sera envoyé.' },
      { status: 200 }
    );
  }

  const parsed = bodySchema.safeParse(body);
  if (parsed.success) {
    // Ne pas await trop longtemps côté client : fire-and-forget contrôlé
    await requestNewInvitationLink(parsed.data.email);
  }

  return NextResponse.json({
    ok: true,
    message: 'Si un compte correspond, un email sera envoyé.',
  });
}
