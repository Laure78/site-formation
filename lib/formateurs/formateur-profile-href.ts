import { LINKS } from '@/lib/internal-links';
import type { FormateurId, FormateurProfile } from '@/lib/formateurs/types';

export const FORMATEUR_LAURE_SLUG = 'laure-olivie' as const;

export function isLaureFormateurSlug(slug: string): boolean {
  return slug === FORMATEUR_LAURE_SLUG;
}

/** Chemin public du profil formateur (sans domaine). */
export function formateurPublicProfilePath(slug: string, _id?: FormateurId): string {
  return `${LINKS.formateurs}/${slug}`;
}

export function formateurPublicProfileHref(
  formateur: Pick<FormateurProfile, 'slug' | 'id' | 'profileHref' | 'profilePage'>,
): string {
  if (formateur.profileHref) return formateur.profileHref;
  if (formateur.profilePage === false) {
    return `${LINKS.formateurs}#${formateur.slug}`;
  }
  return formateurPublicProfilePath(formateur.slug, formateur.id);
}

export function formateurPublicProfileAbsoluteUrl(
  formateur: Pick<FormateurProfile, 'slug' | 'id' | 'profileHref' | 'profilePage'>,
  siteUrl: string,
): string {
  const base = siteUrl.replace(/\/$/, '');
  return `${base}${formateurPublicProfileHref(formateur)}`;
}