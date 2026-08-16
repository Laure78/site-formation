/**
 * Formulations éditoriales — financement formations (Constructys / OPCO).
 * Éviter les promesses absolues (100 %, garanti, gratuit, aucun reste à charge).
 */

/** Formulation prudente — paragraphes, FAQ détaillées, pages financement */
export const FINANCEMENT_FORMULATION_PRUDENTE =
  'Formation éligible à une prise en charge partielle par Constructys ou votre OPCO, selon votre statut, votre branche professionnelle et les conditions en vigueur.';

/** Formulation courte — meta, badges, accroches commerciales */
export const FINANCEMENT_FORMULATION_COURTE =
  'Financement partiel possible selon éligibilité.';

/**
 * Mention courte avec lien (composant `MentionFinancement` variant="court").
 * Libellé demandé pour l’accueil et les remplacements hors L’essentiel / FINANCEMENT.
 */
export const FINANCEMENT_FORMULATION_COURTE_LIEN = 'Financement possible selon éligibilité';

/** Ancre lien interne vers la page financement (sans « 100 % ») */
export const FINANCEMENT_PAGE_LINK_LABEL = 'financement Constructys formation IA pour le BTP';

/** Badge stats / cartes — libellé sans pourcentage absolu */
export const FINANCEMENT_STAT_LABEL = 'FINANCEMENT POSSIBLE';

/** Badge stats — valeur affichée (remplace « 100 % ») */
export const FINANCEMENT_STAT_VAL = 'OPCO';

/** Réponse FAQ type « est-ce finançable ? » */
export const FINANCEMENT_FAQ_FINANÇABLE_REPONSE = `${FINANCEMENT_FORMULATION_PRUDENTE} ${FINANCEMENT_FORMULATION_COURTE}`;

/** Complément barèmes Constructys (plafonds, sans promesse de couverture totale) */
export const FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT =
  'Plafonds indicatifs Constructys : 24 € HT/heure/stagiaire (pédagogie), soit 96 € HT/stagiaire pour 4 h — jusqu\'à 840 € HT/jour/groupe en intra. La prise en charge est partielle au-delà d\'un certain effectif, selon barèmes et dossier en vigueur.';

/**
 * Corps FAQ home / catalogue — partielle + lien page financement (selon éligibilité conservé).
 * Le href est injecté côté `lib/faq.ts` via LINKS.financement.
 */
export const FINANCEMENT_FAQ_PARTIELLE_CORPS =
  'Oui : une prise en charge partielle est possible via Constructys ou votre OPCO selon éligibilité. Le plafond s’applique par stagiaire (24 € HT × 4 h = 96 € HT indicatifs) : au-delà d’un certain effectif, un reste à charge est fréquent.';
