/**
 * Promotion / création du compte admin contact@laureolivie.fr
 *
 * Prérequis dans .env.local :
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 *
 * Usage :
 *   node --env-file=.env.local scripts/promote-admin-laure.mjs
 *   node --env-file=.env.local scripts/promote-admin-laure.mjs --create --password 'MotDePasseSecurise'
 */
import { createClient } from '@supabase/supabase-js';

const EMAIL = 'contact@laureolivie.fr';
const FULL_NAME = 'Laure Olivié';

const args = new Set(process.argv.slice(2));
const createIfMissing = args.has('--create');
const pwdIdx = process.argv.indexOf('--password');
const password = pwdIdx >= 0 ? process.argv[pwdIdx + 1] : null;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    '❌ SUPABASE_SERVICE_ROLE_KEY et NEXT_PUBLIC_SUPABASE_URL sont requis dans .env.local\n' +
      '   Supabase → Project Settings → API → service_role (Reveal)'
  );
  process.exit(1);
}

const admin = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function findUserByEmail(email) {
  // listUsers paginé — projet LMS de taille modérée
  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const found = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (found) return found;
    if (data.users.length < perPage) return null;
    page += 1;
    if (page > 50) return null;
  }
}

async function ensureProfile(userId) {
  const { data: existing, error: selErr } = await admin
    .from('profiles')
    .select('id, role, email')
    .eq('id', userId)
    .maybeSingle();
  if (selErr) throw selErr;

  if (!existing) {
    const { error: insErr } = await admin.from('profiles').insert({
      id: userId,
      email: EMAIL,
      full_name: FULL_NAME,
      role: 'admin',
      updated_at: new Date().toISOString(),
    });
    if (insErr) throw insErr;
    return { created: true, role: 'admin' };
  }

  const { error: updErr } = await admin
    .from('profiles')
    .update({
      role: 'admin',
      full_name: FULL_NAME,
      email: EMAIL,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);
  if (updErr) throw updErr;
  return { created: false, previousRole: existing.role, role: 'admin' };
}

async function main() {
  let user = await findUserByEmail(EMAIL);

  if (!user) {
    if (!createIfMissing) {
      console.error(
        `❌ Aucun compte Auth pour ${EMAIL}.\n` +
          '   Relancez avec : node --env-file=.env.local scripts/promote-admin-laure.mjs --create --password \'...\'\n' +
          '   ou créez le compte via Inscription / Auth > Users, puis relancez sans --create.'
      );
      process.exit(1);
    }
    if (!password || password.length < 10) {
      console.error('❌ --create exige --password avec au moins 10 caractères.');
      process.exit(1);
    }
    const { data, error } = await admin.auth.admin.createUser({
      email: EMAIL,
      password,
      email_confirm: true,
      user_metadata: { full_name: FULL_NAME },
    });
    if (error) throw error;
    user = data.user;
    console.log(`✅ Compte Auth créé : ${EMAIL}`);
  } else {
    console.log(`ℹ️  Compte Auth trouvé : ${user.id}`);
  }

  const profile = await ensureProfile(user.id);
  if (profile.created) {
    console.log('✅ Profil créé avec rôle admin');
  } else {
    console.log(`✅ Profil promu admin (avant : ${profile.previousRole ?? 'inconnu'})`);
  }

  console.log('\nProchaine étape :');
  console.log('  1. Ouvrir /acces-admin');
  console.log(`  2. Se connecter avec ${EMAIL}`);
  console.log('  3. Vérifier la redirection vers /admin');
}

main().catch((err) => {
  console.error('❌', err instanceof Error ? err.message : err);
  process.exit(1);
});
