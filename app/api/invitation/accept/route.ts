import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getInvitationByToken } from '@/lib/invitation';
import { checkRateLimit, clientIpFromRequest } from '@/lib/rate-limit';
import { generateInvitationToken, hashInvitationToken } from '@/lib/invitation-token';
import { invitationPasswordSchema } from '@/lib/password-policy';

const acceptSchema = z.object({
  token: z.string().min(20).max(200),
  password: invitationPasswordSchema,
  confirmPassword: z.string().min(1).max(128),
});

const GENERIC_INVALID = 'Invitation invalide ou expirée.';
const GENERIC_ERROR = 'Impossible d’activer le compte. Réessayez ou contactez le formateur.';

export async function POST(request: NextRequest) {
  const ip = clientIpFromRequest(request);
  const rl = checkRateLimit(`invitation-accept:${ip}`, 8, 15 * 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessayez plus tard.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
  }

  const parsed = acceptSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Données invalides' },
      { status: 400 }
    );
  }
  if (parsed.data.password !== parsed.data.confirmPassword) {
    return NextResponse.json({ error: 'Les mots de passe ne correspondent pas.' }, { status: 400 });
  }

  const supabase = await createClient();
  const invitation = await getInvitationByToken(supabase, parsed.data.token);

  if (
    !invitation ||
    invitation.status !== 'pending' ||
    new Date(invitation.expires_at) <= new Date()
  ) {
    return NextResponse.json({ error: GENERIC_INVALID }, { status: 400 });
  }

  const admin = createAdminClient();
  let userId = invitation.user_id;

  if (!userId) {
    const { data: profile } = await admin
      .from('profiles')
      .select('id')
      .eq('email', invitation.email.toLowerCase())
      .maybeSingle();
    userId = profile?.id ?? null;
  }

  if (!userId) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  const { data: profile } = await admin
    .from('profiles')
    .select('id, role, account_status, email')
    .eq('id', userId)
    .maybeSingle();

  if (!profile) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  // Anti-takeover : ne jamais réécrire le mot de passe d’un compte déjà actif
  // ni d’un compte privilégié (admin / formateur / moderator).
  if (profile.role === 'admin' || profile.role === 'formateur' || profile.role === 'moderator') {
    console.error('[invitation/accept] refus : compte privilégié', profile.role);
    return NextResponse.json({ error: GENERIC_INVALID }, { status: 400 });
  }

  if (profile.account_status === 'active') {
    return NextResponse.json(
      {
        error:
          'Ce compte est déjà activé. Connectez-vous ou utilisez « mot de passe oublié » si besoin.',
      },
      { status: 400 }
    );
  }

  if (profile.account_status === 'disabled') {
    return NextResponse.json({ error: GENERIC_INVALID }, { status: 400 });
  }

  // Consommer le token EN PREMIER (usage unique) pour éviter les courses concurrentes.
  const consumedHash = hashInvitationToken(generateInvitationToken());
  const { data: consumed, error: consumeError } = await admin
    .from('invitations')
    .update({
      status: 'accepted',
      accepted_at: new Date().toISOString(),
      token_hash: consumedHash,
    })
    .eq('id', invitation.id)
    .eq('status', 'pending')
    .gt('expires_at', new Date().toISOString())
    .select('id')
    .maybeSingle();

  if (consumeError || !consumed) {
    return NextResponse.json({ error: GENERIC_INVALID }, { status: 400 });
  }

  const { error: pwdError } = await admin.auth.admin.updateUserById(userId, {
    password: parsed.data.password,
    email_confirm: true,
  });
  if (pwdError) {
    console.error('[invitation/accept] update password failed');
    // Token déjà consommé : ne pas exposer le détail ; l’admin pourra renvoyer une invitation.
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  const fullName = [invitation.first_name, invitation.last_name].filter(Boolean).join(' ') || null;
  await admin
    .from('profiles')
    .update({
      account_status: 'active',
      first_name: invitation.first_name,
      last_name: invitation.last_name,
      full_name: fullName,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .neq('role', 'admin')
    .neq('role', 'formateur');

  if (invitation.formation_id) {
    await admin.from('enrollments').upsert(
      { user_id: userId, course_id: invitation.formation_id, progress_percent: 0 },
      { onConflict: 'user_id,course_id' }
    );
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: invitation.email,
    password: parsed.data.password,
  });
  if (signInError) {
    return NextResponse.json(
      {
        ok: true,
        needsLogin: true,
        message: 'Compte activé. Connectez-vous avec votre email et mot de passe.',
      },
      { status: 200 }
    );
  }

  let courseSlug = '';
  if (invitation.formation_id) {
    const { data: course } = await admin
      .from('courses')
      .select('slug')
      .eq('id', invitation.formation_id)
      .maybeSingle();
    courseSlug = course?.slug ?? '';
  }

  return NextResponse.json({
    ok: true,
    courseSlug,
    redirectTo: courseSlug ? `/espace-apprenant/cours/${courseSlug}` : '/espace-apprenant',
  });
}
