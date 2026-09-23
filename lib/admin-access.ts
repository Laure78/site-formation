import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getProfile, isAdmin, type Profile, type UserRole } from '@/lib/auth';
import { sanitizeInternalPath } from '@/lib/sanitize-internal-path';

export { sanitizeInternalPath };

/**
 * Fallback liste blanche si ADMIN_ALLOWED_EMAILS est absent.
 * Ne suffit jamais seul : le rôle `admin` en base est toujours exigé (voir canAccessAdmin).
 */
const DEFAULT_ADMIN_LOGIN_EMAILS = [
  'contact@laureolivie.fr',
  'laureolivie@yahoo.fr',
] as const;

/** Emails autorisés à accéder à /admin (liste blanche, défense en profondeur). */
export function parseAllowedAdminEmails(
  envValue: string | undefined = process.env.ADMIN_ALLOWED_EMAILS
): Set<string> {
  const fromEnv = envValue?.trim();
  // Toujours inclure les emails fondatrice en secours (en plus de la liste env).
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

export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  // Relit l’env à chaque appel (évite un Set figé au chargement du module / build).
  return parseAllowedAdminEmails().has(email.trim().toLowerCase());
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

/**
 * Lit le profil de façon fiable pour les décisions d’accès admin.
 * Préfère le service role (évite faux négatif RLS / .single() silencieux).
 */
export async function getProfileForAccessCheck(userId: string): Promise<Profile | null> {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const admin = createAdminClient();
      const { data, error } = await admin
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      if (!error && data) return data as Profile;
    } catch {
      // fallback client session ci-dessous
    }
  }
  return getProfile(userId);
}

/** Vérifie session + droits admin (server components, actions, routes API). */
export async function requireAdminAccess(): Promise<AdminAccessResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { ok: false, reason: 'unauthenticated' };
  }

  const profile = await getProfileForAccessCheck(user.id);
  if (!canAccessAdmin(profile, user.email)) {
    return { ok: false, reason: 'forbidden' };
  }

  return { ok: true, userId: user.id, profile: profile!, email: user.email };
}

/**
 * Accès section Organisation (`/admin/mon-espace`) :
 * uniquement le rôle `admin` + email allowlist — les formateurs sont exclus.
 */
export function canAccessOrganisation(
  profile: Pick<Profile, 'role'> | null | undefined,
  email: string | null | undefined
): boolean {
  if (!profile?.role || profile.role !== 'admin') return false;
  return isAllowedAdminEmail(email);
}

export async function requireOrganisationAdminAccess(): Promise<AdminAccessResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { ok: false, reason: 'unauthenticated' };
  }

  const profile = await getProfileForAccessCheck(user.id);
  if (!canAccessOrganisation(profile, user.email)) {
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
