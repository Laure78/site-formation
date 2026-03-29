import { createClient } from '@/lib/supabase/server';
import { getInvitationByToken } from '@/lib/invitation';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token, email, password, fullName } = body;
  if (!token || !email || !password) {
    return Response.json({ error: 'Données manquantes' }, { status: 400 });
  }

  const supabase = await createClient();

  const invitation = await getInvitationByToken(supabase, token);

  if (!invitation || invitation.email.toLowerCase() !== email.toLowerCase()) {
    return Response.json({ error: 'Invitation invalide' }, { status: 400 });
  }
  if (invitation.accepted_at) {
    return Response.json({ error: 'Cette invitation a déjà été utilisée' }, { status: 400 });
  }
  if (new Date(invitation.expires_at) < new Date()) {
    return Response.json({ error: 'Cette invitation a expiré' }, { status: 400 });
  }

  const { data: course } = await supabase
    .from('courses')
    .select('id, slug')
    .eq('id', invitation.course_id)
    .single();

  const { data: signUp, error: signUpError } = await supabase.auth.signUp({
    email: invitation.email,
    password,
    options: {
      data: { full_name: fullName || undefined },
      emailRedirectTo: undefined,
    },
  });

  if (signUpError) {
    if (signUpError.message.includes('already been registered')) {
      return Response.json({ error: 'Un compte existe déjà avec cet email. Connectez-vous.' }, { status: 400 });
    }
    return Response.json({ error: signUpError.message }, { status: 400 });
  }

  if (!signUp.user) {
    return Response.json({ error: 'Erreur lors de la création du compte' }, { status: 500 });
  }

  await supabase.from('profiles').update({
    full_name: fullName || null,
    first_name: fullName?.split(' ')[0] || null,
    last_name: fullName?.split(' ').slice(1).join(' ') || null,
    updated_at: new Date().toISOString(),
  }).eq('id', signUp.user.id);

  await supabase.from('enrollments').upsert(
    { user_id: signUp.user.id, course_id: invitation.course_id, progress_percent: 0 },
    { onConflict: 'user_id,course_id' }
  );

  await supabase
    .from('invitations')
    .update({ accepted_at: new Date().toISOString() })
    .eq('id', invitation.id);

  return Response.json({
    ok: true,
    courseSlug: course?.slug ?? '',
  });
}
