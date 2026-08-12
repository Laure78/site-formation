import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requestNewInvitationLink } from '@/lib/invitation';
import { checkRateLimit, clientIpFromRequest } from '@/lib/rate-limit';

const bodySchema = z.object({
  email: z.string().trim().email().max(254).transform((v) => v.toLowerCase()),
});

const NEUTRAL = {
  ok: true as const,
  message: 'Si un compte correspond, un email sera envoyé.',
};

/**
 * Demande publique d’un nouveau lien d’invitation.
 * Réponse volontairement neutre (ne révèle pas si l’email existe).
 */
export async function POST(request: NextRequest) {
  const ip = clientIpFromRequest(request);
  const rlIp = checkRateLimit(`invitation-request:ip:${ip}`, 5, 15 * 60_000);
  if (!rlIp.ok) {
    return NextResponse.json(NEUTRAL, { status: 200 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(NEUTRAL, { status: 200 });
  }

  const parsed = bodySchema.safeParse(body);
  if (parsed.success) {
    const rlEmail = checkRateLimit(`invitation-request:email:${parsed.data.email}`, 3, 60 * 60_000);
    if (rlEmail.ok) {
      await requestNewInvitationLink(parsed.data.email);
    }
  }

  return NextResponse.json(NEUTRAL);
}
