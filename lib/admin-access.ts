import { createClient } from '@/lib/supabase/server';
import { getProfile, isAdmin, type Profile, type UserRole } from '@/lib/auth';

/**
 * Fallback liste blanche si ADMIN_ALLOWED_EMAILS est absent.
 * Ne suffit jamais seul : le rôle `admin` en base est toujours exigé (voir canAccessAdmin).
 */
const DEFAULT_ADMIN_LOGIN_EMAIL = 'laureolivie@yahoo.fr';

/** Emails autorisés à accéder à /admin (liste blanche, défense en profondeur). */
export function parseAllowedAdminEmails(
  envValue: string | undefined = process.env.ADMIN_ALLOWED_EMAILS
): Set<string> {
  const fromEnv = envValue?.trim();
  const raw = fromEnv || DEFAULT_ADMIN_LOGIN_EMAIL;
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

/**
 * Accès admin : rôle staff valide + liste blanche pour le rôle `admin`.
 * - `formateur` : accès admin plateforme (sans allowlist email)
 * - `admin` : rôle + email allowlist (jamais l’email seul)
 * - rôle absent / inconnu / `apprenant` : refusé
 */
export function canAccessAdmin(
  profile: Pick<Profile, 'role'> | null | undefined,
  email: string | null | undefined
): boolean {
  if (!profile?.role || !isAdmin(profile.role)) return false;
  if (profile.role === 'formateur') return true;
  if (profile.role !== 'admin') return false;
  return isAllowedAdminEmail(email);
}

/** Chemins réservés à l’admin (redirection post-login). */
export function isAdminOnlyPath(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/api/admin');
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

/**
 * Destination après connexion / callback OAuth.
 * N’honore `next` vers /admin que si l’utilisateur a réellement les droits.
 */
export function resolvePostAuthPath(
  nextRaw: string | null | undefined,
  profile: Pick<Profile, 'role'> | null | undefined,
  email: string | null | undefined
): string {
  const safeNext = sanitizeInternalPath(nextRaw);
  const adminOk = canAccessAdmin(profile, email);

  if (safeNext) {
    const pathname = safeNext.split('?')[0] ?? safeNext;
    if (isAdminOnlyPath(pathname)) {
      if (adminOk) return safeNext;
    } else {
      return safeNext;
    }
  }

  return adminOk ? '/admin' : '/espace-apprenant';
}

export type AdminAccessDeniedReason = 'unauthenticated' | 'forbidden';

export type AdminAccessResult =
  | { ok: true; userId: string; profile: Profile; email: string }
  | { ok: false; reason: AdminAccessDeniedReason };

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

export function adminAccessDeniedMessage(reason: AdminAccessDeniedReason): string {
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
