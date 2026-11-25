import { LINKS } from '@/lib/internal-links';
import type { FormateurId, FormateurProfile } from '@/lib/formateurs/types';

/** Laure Olivié — page dédiée `/a-propos` (pas de fiche sous `/formateurs/`). */
export const FORMATEUR_LAURE_SLUG = 'laure-olivie' as const;

export function isLaureFormateurSlug(slug: string): boolean {
  return slug === FORMATEUR_LAURE_SLUG;
}

/** Chemin public du profil formateur (sans domaine). */
export function formateurPublicProfilePath(slug: string, id?: FormateurId): string {
  if (isLaureFormateurSlug(slug) || id === FORMATEUR_LAURE_SLUG) {
    return LINKS.aPropos;
  }
  return `${LINKS.formateurs}/${slug}`;
}

export function formateurPublicProfileHref(formateur: Pick<FormateurProfile, 'slug' | 'id' | 'profileHref'>): string {
  if (formateur.profileHref) return formateur.profileHref;
  return formateurPublicProfilePath(formateur.slug, formateur.id);
}

export function formateurPublicProfileAbsoluteUrl(
  formateur: Pick<FormateurProfile, 'slug' | 'id' | 'profileHref'>,
  siteUrl: string,
): string {
  const base = siteUrl.replace(/\/$/, '');
  return `${base}${formateurPublicProfileHref(formateur)}`;
}