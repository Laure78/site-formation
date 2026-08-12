/**
 * Constantes Qualiopi — indicateurs, délais, version fiches.
 * Chiffres formés / note / répondants : source unique `PREUVES` (`lib/constants.ts`).
 */
import {
  PREUVES,
  PREUVES_MENTION_SOURCE,
  PREUVES_PERIODE,
  PREUVES_SATISFACTION_VALEUR,
  formatPreuvesMajLe,
} from '@/lib/constants';

export const QUALIOPI_STATS = {
  NB_FORMES: PREUVES.prosFormes,
  NOTE_MOYENNE: PREUVES.satisfaction,
  NOTE_MOYENNE_VALEUR: PREUVES_SATISFACTION_VALEUR,
  PERIODE_DEBUT: PREUVES_PERIODE.debut,
  PERIODE_FIN: PREUVES_PERIODE.fin,
  NB_REPONDANTS: PREUVES.repondants,
  DATE_MAJ: PREUVES.majAt,
} as const;

export const QUALIOPI_FICHE_META = {
  /** Format JJ/MM/AAAA exigé par `assert-infos-reglementaires`. */
  updatedAt: formatPreuvesMajLe(PREUVES.majAt),
  version: 'V2026.1',
} as const;

export const QUALIOPI_DELAI_ACCES_EXACT =
  "Délai d'accès : entrée en formation sous 2 à 4 semaines après signature de la convention. En cas de prise en charge OPCO (Constructys), prévoir un délai minimum de 15 jours entre la demande de financement et le début de la formation.";

/** Aligné sur `CONTACT` (`lib/constants.ts`) — pas d’import pour éviter cycle config ↔ constants. */
export const QUALIOPI_ACCESSIBILITE_EXACT =
  "Accessibilité : mes formations sont accessibles aux personnes en situation de handicap. Référente handicap : Laure Olivié (contact@laureolivie.fr · 06 95 66 18 18) — à contacter en amont de l'inscription afin d'étudier ensemble les aménagements possibles (pédagogiques, matériels, organisationnels).";

export const QUALIOPI_FINANCEMENT_FORMULATION =
  'Organisme certifié Qualiopi. Financement OPCO possible selon éligibilité.';

export const QUALIOPI_CERTIFICAT_REALISATION =
  "Certificat de réalisation et attestation de fin de formation délivrés à l'issue de la session.";

export const QUALIOPI_BEWORK_DISTINCTION =
  "BeWork est un service de solutions IA sur mesure pour le BTP (conception, déploiement, accompagnement), distinct des actions de formation certifiées Qualiopi d'OFC Création d'Entreprise. Il n'est pas éligible aux financements OPCO.";

export const QUALIOPI_SATISFACTION_SOURCING = PREUVES_MENTION_SOURCE;

export const QUALIOPI_DISCLAIMER_GAINS =
  "Résultats observés chez les entreprises que j'ai formées. Les gains varient selon l'organisation, les outils en place et le niveau de pratique.";
