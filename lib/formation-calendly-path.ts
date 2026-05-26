import { FORMATION_IA_VILLES } from '@/lib/seo-formation-ia-hub-data';

const VILLE_SLUGS = new Set(FORMATION_IA_VILLES.map((v) => v.slug));

/**
 * Pages « formation » : widget Calendly inline avant le footer (catalogue + fiches /formation-*).
 * Les pages hub ville /formation-ia/btp-* ont le widget dans le corps de page (évite doublon).
 * Exclut /contact et /prendre-rdv (embed dédié sur la page).
 */
export function isFormationCalendlyInlinePath(pathname: string | null): boolean {
  if (!pathname) return false;
  const p = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  if (p === '/contact' || p === '/prendre-rdv') return false;
  if (p.startsWith('/admin')) return false;
  if (p.startsWith('/api')) return false;
  if (p.startsWith('/formations') || p.startsWith('/formation-')) {
    if (p.startsWith('/formation-ia/')) {
      const slug = p.slice('/formation-ia/'.length);
      if (VILLE_SLUGS.has(slug)) return false;
    }
    return true;
  }
  return false;
}
