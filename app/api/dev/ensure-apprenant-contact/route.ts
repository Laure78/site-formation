import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { enrollDefaultAdminOnAllCourses } from '@/lib/lms-auto-enroll';

const TARGET_EMAIL = 'contact@laureolivie.fr';
const FULL_NAME = 'Laure Olivié';

/**
 * Bootstrap local uniquement : crée / répare le compte espace apprenant contact@.
 * POST { "password": "..." } — NODE_ENV=development uniquement.
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Disponible en développement uniquement.' }, { status: 404 });
  }

  let password = '';
  try {
    const body = (await request.json()) as { password?: string };
    password = typeof body.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json({ error: 'JSON invalide.' }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Mot de passe requis (8 caractères minimum).' },
      { status: 400 }
    );
  }

  try {
    const admin = createAdminClient();

    // Recherche paginée
    let user: { id: string; email?: string } | null = null;
    for (let page = 1; page <= 20; page += 1) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
      if (error) throw error;
      const found = data.users.find((u) => u.email?.toLowerCase() === TARGET_EMAIL);
      if (found) {
        user = found;
        break;
      }
      if (data.users.length < 200) break;
    }

    let created = false;
    if (!user) {
      const { data, error } = await admin.auth.admin.createUser({
        email: TARGET_EMAIL,
        password,
        email_confirm: true,
        user_metadata: { full_name: FULL_NAME },
      });
      if (error) throw error;
      if (!data.user) throw new Error('Création Auth sans user');
      user = data.user;
      created = true;
    } else {
      const { error } = await admin.auth.admin.updateUserById(user.id, {
        password,
        email_confirm: true,
      });
      if (error) throw error;
    }

    const { data: existingProfile, error: profileSelErr } = await admin
      .from('profiles')
      .select('id, role, email')
      .eq('id', user.id)
      .maybeSingle();
    if (profileSelErr) throw profileSelErr;

    if (!existingProfile) {
      const { error } = await admin.from('profiles').insert({
        id: user.id,
        email: TARGET_EMAIL,
        full_name: FULL_NAME,
        role: 'apprenant',
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
    } else {
      // Ne pas rétrograder un admin/formateur existant.
      const patch: Record<string, string> = {
        email: TARGET_EMAIL,
        full_name: FULL_NAME,
        updated_at: new Date().toISOString(),
      };
      if (!existingProfile.role || existingProfile.role === 'apprenant') {
        patch.role = 'apprenant';
      }
      const { error } = await admin.from('profiles').update(patch).eq('id', user.id);
      if (error) throw error;
    }

    const enroll = await enrollDefaultAdminOnAllCourses(admin, TARGET_EMAIL);

    // Vérifie que le mot de passe fonctionne bien (même projet Auth que la prod).
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    let loginOk = false;
    let loginError: string | null = null;
    if (url && anon) {
      const { createClient } = await import('@supabase/supabase-js');
      const pub = createClient(url, anon);
      const { data: sessionData, error: loginErr } = await pub.auth.signInWithPassword({
        email: TARGET_EMAIL,
        password,
      });
      loginOk = !loginErr && !!sessionData.session;
      loginError = loginErr?.message ?? null;
      if (sessionData.session) {
        await pub.auth.signOut();
      }
    }

    return NextResponse.json({
      ok: true,
      email: TARGET_EMAIL,
      userId: user.id,
      created,
      passwordUpdated: true,
      loginOk,
      loginError,
      enrollments: enroll.ok
        ? { enrolled: enroll.enrolled, totalCourses: enroll.totalCourses }
        : { error: enroll.error },
      next: '/espace-apprenant',
    });
  } catch (err) {
    console.error('[ensure-apprenant-contact]', err);
    const message =
      err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string'
        ? (err as { message: string }).message
        : err instanceof Error
          ? err.message
          : 'Erreur serveur';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
