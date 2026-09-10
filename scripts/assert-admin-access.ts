/**
 * Contrôles bloquants — accès admin, redirections post-auth, sanitization.
 * Usage : `npx tsx scripts/assert-admin-access.ts`
 */
import assert from 'node:assert/strict';
import {
  canAccessAdmin,
  isAdminOnlyPath,
  parseAllowedAdminEmails,
  resolvePostAuthPath,
  sanitizeInternalPath,
} from '../lib/admin-access';
import { isAdmin } from '../lib/auth';

// --- Rôles / droits admin ---

assert.equal(canAccessAdmin(null, 'laureolivie@yahoo.fr'), false, 'sans profil → refusé');
assert.equal(canAccessAdmin({ role: 'apprenant' }, 'laureolivie@yahoo.fr'), false, 'apprenant → refusé');
assert.equal(canAccessAdmin({ role: 'admin' }, null), false, 'admin sans email → refusé');
assert.equal(
  canAccessAdmin({ role: 'admin' }, 'intrus-hors-liste@example.com'),
  false,
  'admin hors allowlist → refusé'
);
assert.equal(
  canAccessAdmin({ role: 'formateur' }, 'autre@example.com'),
  true,
  'formateur → OK sans allowlist email'
);
assert.equal(isAdmin('apprenant'), false);
assert.equal(isAdmin('admin'), true);
assert.equal(isAdmin('formateur'), true);

const customAllow = parseAllowedAdminEmails('alice@ofc.fr, bob@ofc.fr');
assert.equal(customAllow.has('alice@ofc.fr'), true);
assert.equal(customAllow.has('laureolivie@yahoo.fr'), false);

const runtimeAllow = parseAllowedAdminEmails(process.env.ADMIN_ALLOWED_EMAILS);
const adminEmail = [...runtimeAllow][0];
assert.ok(adminEmail, 'allowlist non vide');
assert.equal(
  canAccessAdmin({ role: 'admin' }, adminEmail),
  true,
  'admin + email allowlist courant → OK'
);

// --- Sanitization / open redirect ---

assert.equal(sanitizeInternalPath('//evil.com'), null);
assert.equal(sanitizeInternalPath('https://evil.com'), null);
assert.equal(sanitizeInternalPath('/auth/connexion'), null);
assert.equal(sanitizeInternalPath('/auth/reset-password'), '/auth/reset-password');
assert.equal(sanitizeInternalPath('/admin'), '/admin');
assert.equal(sanitizeInternalPath('/espace-apprenant'), '/espace-apprenant');
assert.equal(sanitizeInternalPath('/admin/apprenants?x=1'), '/admin/apprenants?x=1');
assert.equal(sanitizeInternalPath('../admin'), null);
assert.equal(isAdminOnlyPath('/admin'), true);
assert.equal(isAdminOnlyPath('/admin/formations'), true);
assert.equal(isAdminOnlyPath('/api/admin/apprenants'), true);
assert.equal(isAdminOnlyPath('/espace-apprenant'), false);

// --- Redirections selon rôle ---

assert.equal(
  resolvePostAuthPath('/admin', { role: 'apprenant' }, 'a@b.fr'),
  '/espace-apprenant',
  'apprenant avec next=/admin → espace apprenant'
);
assert.equal(
  resolvePostAuthPath('/admin', { role: 'admin' }, adminEmail),
  '/admin',
  'admin légitime next=/admin → /admin'
);
assert.equal(
  resolvePostAuthPath(null, { role: 'admin' }, adminEmail),
  '/admin',
  'admin sans next → /admin'
);
assert.equal(
  resolvePostAuthPath(null, { role: 'apprenant' }, 'stagiaire@example.com'),
  '/espace-apprenant',
  'apprenant sans next → espace'
);
assert.equal(
  resolvePostAuthPath('/espace-apprenant', { role: 'admin' }, adminEmail),
  '/espace-apprenant',
  'admin peut aller vers espace apprenant si next le demande'
);
assert.equal(
  resolvePostAuthPath('//evil.com', { role: 'admin' }, adminEmail),
  '/admin',
  'open redirect rejeté → défaut admin'
);
assert.equal(
  resolvePostAuthPath('/auth/reset-password', { role: 'apprenant' }, 'a@b.fr'),
  '/auth/reset-password',
  'recovery → reset-password autorisé'
);
assert.equal(
  resolvePostAuthPath(null, null, adminEmail),
  '/espace-apprenant',
  'email allowlist seul sans rôle → pas admin'
);
assert.equal(
  resolvePostAuthPath(null, { role: 'formateur' }, 'formateur@example.com'),
  '/admin',
  'formateur sans next → /admin'
);

console.log('assert-admin-access : OK');
