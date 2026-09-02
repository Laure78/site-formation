/**
 * Formulations éditoriales — financement formations (Constructys / OPCO).
 * Ne pas promettre un financement garanti — toujours conditionner à l'éligibilité.
 */

/** Formulation marketing — prise en charge intégrale possible selon dossier OPCO. */
export const FINANCEMENT_PRISE_EN_CHARGE_100_SELON_ELIGIBILITE =
  '100 % de prise en charge possible selon éligibilité (Constructys / plan de développement des compétences).';

/** Formulation SEO / badges — Constructys sans promesse de prise en charge. */
export const FINANCEMENT_CONSTRUCTYS_FORMULATION =
  'Finançable par Constructys selon éligibilité';

/** Formulation prudente — paragraphes juridiques détaillés, pages financement et tarifs */
export const FINANCEMENT_FORMULATION_PRUDENTE =
  `${FINANCEMENT_PRISE_EN_CHARGE_100_SELON_ELIGIBILITE} Plafonds et reste à charge selon barèmes Constructys, effectif et dossier en vigueur.`;

/** Formulation courte — meta, badges, accroches commerciales (sans promesse de 100 %). */
export const FINANCEMENT_FORMULATION_COURTE =
  'Financement OPCO possible selon éligibilité — un reste à charge peut s’appliquer.';

/** Formulation page catalogue `/formations` — alignée consigne UX. */
export const FINANCEMENT_FORMULATION_CATALOGUE =
  'Participation possible selon l’éligibilité, les plafonds et l’accord de l’OPCO. Un reste à charge peut s’appliquer.';

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
  `Oui : ${FINANCEMENT_PRISE_EN_CHARGE_100_SELON_ELIGIBILITE} Plafond pédagogique indicatif : 24 € HT/heure/stagiaire (96 € HT pour 4 h) — au-delà d'un certain effectif, un reste à charge peut s'appliquer selon barèmes et dossier.`;
