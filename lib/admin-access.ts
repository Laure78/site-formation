import { createClient } from '@/lib/supabase/server';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import { getProfile, isAdmin, type Profile, type UserRole } from '@/lib/auth';

/** Emails autorisés à accéder à /admin (liste blanche, défense en profondeur). */
function parseAllowedAdminEmails(): Set<string> {
  const fromEnv = process.env.ADMIN_ALLOWED_EMAILS?.trim();
  const raw = fromEnv || SCHEMA_CONTACT.email;
  return new Set(
    raw
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  );
}

const ALLOWED_ADMIN_EMAILS = parseAllowedAdminEmails();

export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ALLOWED_ADMIN_EMAILS.has(email.trim().toLowerCase());
}

/** Accès admin : rôle staff + liste blanche pour le rôle admin uniquement. */
export function canAccessAdmin(
  profile: Pick<Profile, 'role'> | null | undefined,
  email: string | null | undefined
): boolean {
  if (!profile || !isAdmin(profile.role)) return false;
  if (profile.role === 'formateur') return true;
  return isAllowedAdminEmail(email);
}

/** Chemins internes sûrs pour redirection post-login (?next=). */
export function sanitizeInternalPath(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const path = raw.trim();
  if (!path.startsWith('/') || path.startsWith('//')) return null;
  if (path.includes('@') || path.includes('\\') || /^https?:/i.test(path)) return null;

  const qIndex = path.indexOf('?');
  const pathname = qIndex >= 0 ? path.slice(0, qIndex) : path;
  if (!/^\/[\w\-./%]*$/.test(pathname)) return null;

  // Évite les boucles sur les pages d’auth (sauf reset-password).
  if (pathname.startsWith('/auth/') && pathname !== '/auth/reset-password') return null;

  return path;
}

export type AdminAccessResult =
  | { ok: true; userId: string; profile: Profile; email: string }
  | { ok: false; reason: 'unauthenticated' | 'forbidden' };

/** Vérifie session + droits admin (server components, actions, routes API). */
export async function requireAdminAccess(): Promise<AdminAccessResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { ok: false, reason: 'unauthenticated' };
  }

  const profile = await getProfile(user.id);
  if (!canAccessAdmin(profile, user.email)) {
    return { ok: false, reason: 'forbidden' };
  }

  return { ok: true, userId: user.id, profile: profile!, email: user.email };
}

export function adminAccessDeniedMessage(reason: AdminAccessResult['reason']): string {
  if (reason === 'unauthenticated') return 'Non authentifié';
  return 'Accès réservé aux administrateurs autorisés';
}

/** Pour affichage admin : masque partiellement l’email. */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return '•••';
  const visible = local.length <= 2 ? local[0] : local.slice(0, 2);
  return `${visible}•••@${domain}`;
}

export type { UserRole };
