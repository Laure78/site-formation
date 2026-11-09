/**
 * SEO — hub /parcours-metiers et 5 fiches /formations/parcours/*.
 * Titres via `buildTitle` (suffixe « | Laure Olivié » inclus dans titleAbsolute).
 */
import type { ParcoursId } from '@/data/catalogue-2027';
import type { ParcoursComputed } from '@/data/catalogue-2027/parcours';
import { libelleDureeParcoursHeures } from '@/data/catalogue-2027/parcours';
import { buildTitle, META_DESCRIPTION_MAX_LENGTH } from '@/utils/metadata';

export const PARCOURS_METIERS_HUB_SEO = {
  titleSegment: 'Parcours métiers IA BTP pour PME',
  description:
    'Parcours métiers IA BTP en Île-de-France : formation IA PME bâtiment et travaux publics, modules à la carte ou parcours complet. Réservez votre visio découverte gratuite.',
} as const;

export type ParcoursSeoPack = {
  titleSegment: string;
  description: string;
  keywords: string;
  /** Description factuelle pour JSON-LD Course (≤ ~300 car. utile). */
  schemaDescription: string;
};

export const PARCOURS_SEO_BY_ID: Record<ParcoursId, ParcoursSeoPack> = {
  'dirigeant-pme-btp': {
    titleSegment: 'IA dirigeant PME BTP · pilotage entreprise',
    description:
      'Formation IA dirigeant PME BTP : marges, trésorerie et pilotage d’entreprise. Présentiel Île-de-France.',
    keywords:
      'formation IA dirigeant BTP, IA PME bâtiment, pilotage entreprise, marges chantier, trésorerie, ChatGPT BTP',
    schemaDescription:
      'Parcours modulaire pour dirigeants et associés de PME du bâtiment : prix, marges, trésorerie, management et déploiement IA. Présentiel Île-de-France, tarifs au module.',
  },
  'charge-affaires-btp': {
    titleSegment: 'IA chargé d’affaires BTP · devis et AO',
    description:
      'Formation IA chargé d’affaires BTP : devis, DCE, mémoire technique et appels d’offres. Présentiel IDF.',
    keywords:
      'formation IA chargé d’affaires, devis BTP ChatGPT, DCE, mémoire technique, appels d’offres travaux',
    schemaDescription:
      'Parcours pour chargés d’affaires et commerciaux BTP : chiffrage, négociation, marchés publics, mémoire technique et suivi d’affaires avec l’IA. Tarifs par module.',
  },
  'conducteur-de-travaux': {
    titleSegment: 'IA conducteur de travaux · chantier',
    description:
      'Formation IA conducteur de travaux : planning, comptes rendus et réception chantier. Modulaire, IDF.',
    keywords:
      'formation IA conducteur de travaux, planning chantier IA, compte rendu chantier, réception travaux, BTP',
    schemaDescription:
      'Parcours conducteur de travaux : préparation et suivi de chantier, planning, CR, coordination jusqu’à la réception. Modules en présentiel IDF, prix au module.',
  },
  'assistant-de-gestion-btp': {
    titleSegment: 'IA assistant de gestion BTP · administratif',
    description:
      'Formation IA assistant de gestion BTP : administratif, facturation, relances et Excel. Présentiel IDF.',
    keywords:
      'formation IA assistant BTP, facturation, relances, administratif chantier, Excel BTP',
    schemaDescription:
      'Parcours assistants de gestion et fonctions support : facturation, relances, organisation documentaire et outils de suivi avec l’IA. Île-de-France, tarif unitaire par module.',
  },
  'referent-ia-btp': {
    titleSegment: 'Référent IA BTP · Claude et déploiement',
    description:
      'Formation référent IA BTP : Claude, déploiement des usages et applications métier. Présentiel IDF, Qualiopi.',
    keywords:
      'référent IA BTP, formation Claude BTP, déploiement IA entreprise, application métier BTP',
    schemaDescription:
      'Parcours référent IA : structuration des usages, Claude et ChatGPT, prototypes métier et plan de déploiement en PME du BTP. Modules facturés à l’unité.',
  },
};

function clampMetaDescription(text: string): string {
  const t = text.trim().replace(/\s+/g, ' ');
  if (t.length <= META_DESCRIPTION_MAX_LENGTH) return t;
  const cut = t.slice(0, META_DESCRIPTION_MAX_LENGTH - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 120 ? cut.slice(0, lastSpace) : cut).trim()}.`;
}

export function parcoursMetiersHubTitle(): string {
  return buildTitle(PARCOURS_METIERS_HUB_SEO.titleSegment);
}

export function parcoursMetiersHubDescription(): string {
  return clampMetaDescription(PARCOURS_METIERS_HUB_SEO.description);
}

export function parcoursMetierPageTitle(id: ParcoursId): string {
  return buildTitle(PARCOURS_SEO_BY_ID[id].titleSegment);
}

/** H1 visible fiche parcours — aligné sur les requêtes métier (fil d’Ariane : `parcours.titre`). */
export const PARCOURS_METIER_PAGE_H1: Record<ParcoursId, string> = {
  'dirigeant-pme-btp': 'Formation IA dirigeant PME BTP',
  'charge-affaires-btp': 'Formation IA chargé d’affaires BTP',
  'conducteur-de-travaux': 'Formation IA conducteur de travaux',
  'assistant-de-gestion-btp': 'Formation IA assistant de gestion BTP',
  'referent-ia-btp': 'Formation référent IA BTP',
};

export function parcoursMetierPageH1(id: ParcoursId): string {
  return PARCOURS_METIER_PAGE_H1[id];
}

export function parcoursMetierPageDescription(p: ParcoursComputed): string {
  const pack = PARCOURS_SEO_BY_ID[p.id];
  const duree = libelleDureeParcoursHeures(p.dureeHeures);
  const withFacts = `${pack.description} ${duree}, ${p.prixInterHt} € HT le parcours — ouverture 2027.`;
  return clampMetaDescription(withFacts);
}
