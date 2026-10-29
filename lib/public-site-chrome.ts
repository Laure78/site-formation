import { isAuthConnexionPage } from '@/lib/auth-connexion-chrome';

/** Préfixes sans bandeau / header / footer marketing (espaces privés, admin, démos). */
const HIDDEN_CHROME_PREFIXES = [
  '/admin',
  '/mon-espace',
  '/espace-apprenant',
  '/auth/',
  '/cours/',
  '/demo/',
  '/outils/demo-',
] as const;

/**
 * Affiche le chrome public (bandeau recrutement, header, footer site).
 * Aligné sur les exclusions du Header, plus les espaces apprenant / formateur.
 */
export function shouldShowPublicSiteChrome(pathname: string | null | undefined): boolean {
  if (isAuthConnexionPage(pathname)) return false;
  if (!pathname) return true;
  return !HIDDEN_CHROME_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
