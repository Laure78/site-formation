import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/auth';
import { canAccessAdmin, isAllowedAdminEmail } from '@/lib/admin-access';

/** Bootstrap local uniquement — promotion admin du compte connecté (via service role). */
export async function GET(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Disponible en développement uniquement.' }, { status: 404 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL('/auth/connexion', request.url);
    loginUrl.searchParams.set('next', '/api/dev/promote-admin');
    return NextResponse.redirect(loginUrl);
  }

  // Jamais promouvoir un email hors allowlist, même en local.
  if (!isAllowedAdminEmail(user.email)) {
    return NextResponse.json(
      {
        error: 'Cet email n’est pas autorisé pour la promotion admin.',
        hint: 'Ajoutez-le à ADMIN_ALLOWED_EMAILS dans .env.local, ou connectez-vous avec le compte admin légitime.',
      },
      { status: 403 }
    );
  }

  const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).single();

  if (profile && canAccessAdmin(profile, user.email)) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (profile && isAdmin(profile.role as 'apprenant' | 'formateur' | 'admin') && !canAccessAdmin(profile, user.email)) {
    return NextResponse.redirect(new URL('/espace-apprenant', request.url));
  }

  // Service role requis : le trigger RLS bloque l’auto-promotion via le client user
  try {
    const admin = createAdminClient();
    const { error } = await admin
      .from('profiles')
      .update({
        role: 'admin',
        full_name: profile?.full_name || 'Laure Olivié',
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      return NextResponse.json(
        {
          error: 'Impossible de promouvoir le compte en admin.',
          hint: 'Vérifiez SUPABASE_SERVICE_ROLE_KEY dans .env.local (voir docs/CONNEXION-ADMIN.md).',
        },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      {
        error: 'Impossible de promouvoir le compte en admin.',
        hint: 'Ajoutez SUPABASE_SERVICE_ROLE_KEY dans .env.local.',
      },
      { status: 500 }
    );
  }

  return NextResponse.redirect(new URL('/admin', request.url));
}
