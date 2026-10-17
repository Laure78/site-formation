/**
 * Libellés durée catalogue — source unique `data/formations.ts`.
 * À utiliser à la place de « 4 h » / « 7 h » en dur hors contexte NIV-01 explicite.
 */
import {
  CATALOGUE_DUREE_BASES_IA_ONLY,
  CATALOGUE_DUREE_SESSION_METIER,
  CATALOGUE_FORMATIONS_TOTAL,
  FORMATION_NIV01,
  getFormationByCode,
  libelleDureeFormation,
  type FormationCode,
} from '@/data/formations';

export {
  CATALOGUE_DUREE_BASES_IA_ONLY,
  CATALOGUE_DUREE_SESSION_METIER,
  CATALOGUE_FORMATIONS_TOTAL,
};

export function dureeCatalogueNiv01(): string {
  return libelleDureeFormation(FORMATION_NIV01);
}

export function dureeCatalogueParCode(code: FormationCode): string {
  return getFormationByCode(code)!.duree;
}

/** Phrase FAQ / blog — durées du catalogue sans valeurs codées en dur. */
export function faqDureesCatalogueSentence(): string {
  return `Les bases de l’IA (NIV-01) durent ${CATALOGUE_DUREE_BASES_IA_ONLY} ; les sessions métier catalogue durent ${CATALOGUE_DUREE_SESSION_METIER}. Format intra (dans vos locaux) ou inter, exclusivement en présentiel en Île-de-France.`;
}

export function phraseSessionCatalogueMetierQualiopi(): string {
  return `Session catalogue ${CATALOGUE_DUREE_SESSION_METIER}, organisme certifié Qualiopi`;
}

export function phraseSessionCataloguePresentielIdf(): string {
  return `Session catalogue ${CATALOGUE_DUREE_SESSION_METIER}, en présentiel uniquement, en Île-de-France uniquement`;
}
