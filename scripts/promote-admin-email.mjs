/**
 * Promotion rôle admin (+ accès Organisation si email dans ADMIN_ALLOWED_EMAILS)
 *
 * Prérequis .env.local : NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Usage :
 *   node --env-file=.env.local scripts/promote-admin-email.mjs email@domaine.fr
 *   npm run admin:promote -- email@domaine.fr
 *   node --env-file=.env.local scripts/promote-admin-email.mjs --invite recrutement@laureolivie.fr
 *   node --env-file=.env.local scripts/promote-admin-email.mjs --create --password '…' --name 'Prénom Nom' email@…
 */
import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'node:crypto';

const DEFAULT_ADMIN_LOGIN_EMAILS = [
  'contact@laureolivie.fr',
  'recrutement@laureolivie.fr',
];

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const positional = args.filter((a) => !a.startsWith('--'));

const createIfMissing = flags.has('--create');
const inviteIfMissing = flags.has('--invite');
const pwdIdx = args.indexOf('--password');
const password = pwdIdx >= 0 ? args[pwdIdx + 1] : null;
const nameIdx = args.indexOf('--name');
const fullNameFromCli = nameIdx >= 0 ? args[nameIdx + 1] : null;

const emails = positional.filter((a) => a.includes('@'));

if (emails.length === 0) {
  console.error(
    'Usage : node --env-file=.env.local scripts/promote-admin-email.mjs [--invite|--create --password …] [--name …] email…'
  );
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

function parseAllowedAdminEmails() {
  const fromEnv = process.env.ADMIN_ALLOWED_EMAILS?.trim();
  const raw = fromEnv
    ? `${fromEnv},${DEFAULT_ADMIN_LOGIN_EMAILS.join(',')}`
    : DEFAULT_ADMIN_LOGIN_EMAILS.join(',');
  return new Set(
    raw
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  );
}

const allowedEmails = parseAllowedAdminEmails();

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

async function ensureAuthUser(email, fullName) {
  let user = await findUserByEmail(email);
  if (user) return { user, created: false };

  if (inviteIfMissing) {
    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
      data: { full_name: fullName },
    });
    if (error) throw error;
    return { user: data.user, created: true, invited: true };
  }

  if (createIfMissing) {
    const pwd =
      password && password.length >= 10
        ? password
        : randomBytes(12).toString('base64url').slice(0, 16);
    if (password && password.length < 10) {
      throw new Error('--create : --password doit faire au moins 10 caractères.');
    }
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password: pwd,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });
    if (error) throw error;
    return {
      user: data.user,
      created: true,
      tempPassword: password ? undefined : pwd,
    };
  }

  return { user: null, missing: true };
}

async function ensureAdminProfile(userId, email, fullName) {
  const { data: existing, error: selErr } = await admin
    .from('profiles')
    .select('id, role, email, full_name')
    .eq('id', userId)
    .maybeSingle();
  if (selErr) throw selErr;

  const patch = {
    role: 'admin',
    email,
    full_name: fullName,
    updated_at: new Date().toISOString(),
  };

  if (!existing) {
    const { error: insErr } = await admin.from('profiles').insert({
      id: userId,
      ...patch,
    });
    if (insErr) throw insErr;
    return { created: true, previousRole: null };
  }

  const { error: updErr } = await admin.from('profiles').update(patch).eq('id', userId);
  if (updErr) throw updErr;
  return { created: false, previousRole: existing.role };
}

function displayName(email) {
  if (fullNameFromCli) return fullNameFromCli;
  const local = email.split('@')[0] ?? email;
  return local.replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

async function main() {
  for (const raw of emails) {
    const email = raw.trim().toLowerCase();
    const fullName = displayName(email);
    console.log(`\n—— ${email} ——`);

    if (!allowedEmails.has(email)) {
      console.warn(
        '⚠️  E-mail hors ADMIN_ALLOWED_EMAILS : /admin et /admin/mon-espace seront refusés en prod tant que la variable (et le redéploiement) ne sont pas à jour.'
      );
    } else {
      console.log('ℹ️  E-mail présent dans la allowlist admin.');
    }

    const auth = await ensureAuthUser(email, fullName);
    if (auth.missing) {
      console.error('❌ Pas de compte Auth — relancez avec --invite ou --create --password …');
      continue;
    }
    if (auth.created) {
      if (auth.invited) console.log('✅ Invitation Auth envoyée');
      else {
        console.log('✅ Compte Auth créé');
        if (auth.tempPassword) {
          console.log(`   Mot de passe temporaire : ${auth.tempPassword}`);
        }
      }
    } else {
      console.log(`ℹ️  Compte Auth : ${auth.user.id}`);
    }

    const profile = await ensureAdminProfile(auth.user.id, email, fullName);
    if (profile.created) {
      console.log('✅ Profil créé — rôle admin');
    } else {
      console.log(`✅ Profil promu admin (avant : ${profile.previousRole ?? 'inconnu'})`);
    }
  }

  console.log('\nVérification : /acces-admin puis /admin/mon-espace (si allowlist OK).');
}

main().catch((err) => {
  console.error('❌', err instanceof Error ? err.message : err);
  process.exit(1);
});
