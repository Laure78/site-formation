/**
 * Formations animées — source unique pour la grille /formateurs et les ancres fiches profil.
 */
import {
  getFormateurFormationLinks,
  getFormateurModuleLinks,
} from '@/lib/formateurs/get-formateurs';
import { formateurPublicProfilePath } from '@/lib/formateurs/formateur-profile-href';
import { LAURE_FORMATIONS_SECTION_ID } from '@/lib/formateurs/laure-olivie/laure-olivie-content';
import { MANUEL_FORMATIONS_SECTION_ID } from '@/lib/formateurs/manuel-gomez/manuel-gomez-content';
import { THOMAS_FORMATIONS_SECTION_ID } from '@/lib/formateurs/thomas-garnier/thomas-garnier-content';
import { MARC_FORMATIONS_SECTION_ID } from '@/lib/formateurs/marc-delcourt/marc-delcourt-content';
import type { FormateurModuleLink } from '@/lib/formateurs/types';
import type { FormateurId, FormateurProfile } from '@/lib/formateurs/types';

export const SHOWCASE_TEASER_MAX_ALL_CATALOGUE = 2 as const;

export type FormateurAnimatedFormationLink = {
  key: string;
  titre: string;
  href: string;
};

const FORMATIONS_SECTION_ANCHOR: Partial<Record<FormateurId, string>> = {
  'laure-olivie': LAURE_FORMATIONS_SECTION_ID,
  'manuel-gomez': MANUEL_FORMATIONS_SECTION_ID,
  'thomas-garnier': THOMAS_FORMATIONS_SECTION_ID,
  'marc-delcourt': MARC_FORMATIONS_SECTION_ID,
};

/** Ancre stable de la rubrique formations sur la fiche individuelle (si définie). */
export function getFormateurFormationsSectionAnchor(
  formateurId: FormateurId,
): string | undefined {
  return FORMATIONS_SECTION_ANCHOR[formateurId];
}

/** Modules explicitement affectés (`moduleCodes`) — inclut ouverture 2027. */
export function getFormateurExplicitModuleLinks(
  formateur: FormateurProfile,
): readonly FormateurModuleLink[] {
  if ((formateur.moduleCodes?.length ?? 0) === 0) {
    return [];
  }
  return getFormateurModuleLinks(formateur, { includeOuverture2027: true });
}

/** Liens catalogue — ordre modules (si présents), sinon ordre catalogue NIV publié. */
export function getFormateurAnimatedFormationLinks(
  formateur: FormateurProfile,
  at: Date = new Date(),
): readonly FormateurAnimatedFormationLink[] {
  const modules = getFormateurExplicitModuleLinks(formateur);
  if (modules.length > 0) {
    return modules.map((m) => ({
      key: m.code,
      titre: m.titre,
      href: m.href,
    }));
  }

  const formations = getFormateurFormationLinks(formateur, at);
  return formations.map((f) => ({
    key: f.code,
    titre: f.titre,
    href: f.href,
  }));
}

export type FormateurShowcaseFormationsTeaser = {
  links: readonly FormateurAnimatedFormationLink[];
  /** Profil + ancre — formateurs sur l’ensemble du catalogue IA. */
  voirToutesHref: string | null;
};

/** Teaser grille /formateurs — intitulés et href uniquement. */
export function getFormateurShowcaseFormationsTeaser(
  formateur: FormateurProfile,
  at: Date = new Date(),
): FormateurShowcaseFormationsTeaser {
  const all = getFormateurAnimatedFormationLinks(formateur, at);
  const anchor = getFormateurFormationsSectionAnchor(formateur.id);

  if (formateur.animatesAllPublished) {
    const links = all.slice(0, SHOWCASE_TEASER_MAX_ALL_CATALOGUE);
    const voirToutesHref =
      anchor && all.length > 0
        ? `${formateurPublicProfilePath(formateur.slug)}#${anchor}`
        : null;
    return { links, voirToutesHref };
  }

  return { links: all, voirToutesHref: null };
}