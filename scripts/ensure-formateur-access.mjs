/**
 * Accès formateur (LMS /admin + dossier extranet /espace-formateurs)
 *
 * Prérequis .env.local : NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Usage :
 *   node --env-file=.env.local scripts/ensure-formateur-access.mjs email1@… email2@…
 *   node --env-file=.env.local scripts/ensure-formateur-access.mjs --invite email1@…
 *   node --env-file=.env.local scripts/ensure-formateur-access.mjs --create --password '…' email1@…
 */
import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'node:crypto';

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const emails = args.filter((a) => !a.startsWith('--') && a.includes('@'));

const createIfMissing = flags.has('--create');
const inviteIfMissing = flags.has('--invite');
const pwdIdx = args.indexOf('--password');
const password = pwdIdx >= 0 ? args[pwdIdx + 1] : null;

if (emails.length === 0) {
  console.error('Usage : node --env-file=.env.local scripts/ensure-formateur-access.mjs [--invite|--create --password …] email…');
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis.');
  process.exit(1);
}

const admin = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function findUserByEmail(email) {
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

async function ensureAuthUser(email) {
  let user = await findUserByEmail(email);
  if (user) return { user, created: false };

  if (inviteIfMissing) {
    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
      data: { full_name: email.split('@')[0] },
    });
    if (error) throw error;
    return { user: data.user, created: true, invited: true };
  }

  if (createIfMissing) {
    const pwd =
      password && password.length >= 10
        ? password
        : randomBytes(12).toString('base64url').slice(0, 16);
    if (!password && pwd.length < 10) {
      throw new Error('--create : mot de passe trop court');
    }
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password: pwd,
      email_confirm: true,
      user_metadata: { full_name: email.split('@')[0] },
    });
    if (error) throw error;
    return { user: data.user, created: true, tempPassword: password ? undefined : pwd };
  }

  return { user: null, created: false, missing: true };
}

async function ensureProfile(userId, email) {
  const { data: existing, error: selErr } = await admin
    .from('profiles')
    .select('id, role, email')
    .eq('id', userId)
    .maybeSingle();
  if (selErr) throw selErr;

  const targetRole =
    existing?.role === 'admin' ? 'admin' : 'formateur';

  if (!existing) {
    const { error: insErr } = await admin.from('profiles').insert({
      id: userId,
      email,
      full_name: email.split('@')[0],
      role: targetRole,
      updated_at: new Date().toISOString(),
    });
    if (insErr) throw insErr;
    return { created: true, role: targetRole };
  }

  if (existing.role === 'admin') {
    return { created: false, role: 'admin', keptAdmin: true };
  }

  if (existing.role === 'formateur') {
    return { created: false, role: 'formateur' };
  }

  const { error: updErr } = await admin
    .from('profiles')
    .update({
      role: 'formateur',
      email,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);
  if (updErr) throw updErr;
  return { created: false, previousRole: existing.role, role: 'formateur' };
}

async function ensureExtranetTrainer(userId, email) {
  const normalized = email.trim().toLowerCase();
  const { data: row, error: selErr } = await admin
    .from('extranet_trainers')
    .select('id, user_id, status')
    .eq('email', normalized)
    .maybeSingle();
  if (selErr) throw selErr;

  if (!row) {
    const { error: insErr } = await admin.from('extranet_trainers').insert({
      email: normalized,
      user_id: userId,
      status: 'onboarding',
      activated_at: new Date().toISOString(),
    });
    if (insErr) throw insErr;
    return { created: true };
  }

  if (!row.user_id) {
    const { error: updErr } = await admin
      .from('extranet_trainers')
      .update({
        user_id: userId,
        status: row.status === 'invited' ? 'onboarding' : row.status,
        activated_at: new Date().toISOString(),
      })
      .eq('id', row.id);
    if (updErr) throw updErr;
    return { created: false, linked: true };
  }

  return { created: false, existing: true };
}

async function main() {
  for (const raw of emails) {
    const email = raw.trim().toLowerCase();
    console.log(`\n—— ${email} ——`);

    const auth = await ensureAuthUser(email);
    if (auth.missing) {
      console.log('⚠️  Pas de compte Auth — relancez avec --invite ou --create --password …');
      continue;
    }
    if (auth.created) {
      console.log(auth.invited ? '✅ Invitation Auth envoyée' : '✅ Compte Auth créé');
      if (auth.tempPassword) {
        console.log(`   Mot de passe temporaire (à changer) : ${auth.tempPassword}`);
      }
    } else {
      console.log(`ℹ️  Compte Auth : ${auth.user.id}`);
    }

    const profile = await ensureProfile(auth.user.id, email);
    if (profile.keptAdmin) {
      console.log('✅ Profil admin conservé (accès /admin déjà complet)');
    } else if (profile.created) {
      console.log(`✅ Profil créé — rôle ${profile.role}`);
    } else if (profile.previousRole) {
      console.log(`✅ Profil promu formateur (avant : ${profile.previousRole})`);
    } else {
      console.log(`✅ Profil OK — rôle ${profile.role}`);
    }

    const extranet = await ensureExtranetTrainer(auth.user.id, email);
    if (extranet.created) console.log('✅ Dossier extranet formateur créé');
    else if (extranet.linked) console.log('✅ Dossier extranet lié au compte');
    else console.log('ℹ️  Dossier extranet déjà en place');
  }

  console.log('\nConnexion :');
  console.log('  • Plateforme LMS : /acces-admin');
  console.log('  • Extranet formateurs : /espace-formateurs/connexion');
}

main().catch((err) => {
  console.error('❌', err instanceof Error ? err.message : err);
  process.exit(1);
});
