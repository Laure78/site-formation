/**
 * Constantes Qualiopi — source unique (indicateurs, délais, version fiches).
 * Mettre à jour ici avant audit de surveillance.
 */

export const QUALIOPI_STATS = {
  NB_FORMES: 1592,
  NOTE_MOYENNE: '4,85/5',
  NOTE_MOYENNE_VALEUR: 4.85,
  PERIODE_DEBUT: '01/01/2024',
  PERIODE_FIN: '31/12/2025',
  NB_REPONDANTS: 412,
  DATE_MAJ: '03/06/2026',
} as const;

export const QUALIOPI_FICHE_META = {
  updatedAt: '03/06/2026',
  version: 'V2026.1',
} as const;

export const QUALIOPI_DELAI_ACCES_EXACT =
  "Délai d'accès : entrée en formation sous 2 à 4 semaines après signature de la convention. En cas de prise en charge OPCO (Constructys), prévoir un délai minimum de 15 jours entre la demande de financement et le début de la formation.";

export const QUALIOPI_ACCESSIBILITE_EXACT =
  "Accessibilité : nos formations sont accessibles aux personnes en situation de handicap. Contactez notre référente handicap, Laure Olivié (laureolivie@yahoo.fr · 06 95 66 18 18), en amont de l'inscription afin d'étudier ensemble les aménagements possibles (pédagogiques, matériels, organisationnels).";

export const QUALIOPI_FINANCEMENT_FORMULATION =
  'Organisme certifié Qualiopi. Financement OPCO possible selon éligibilité.';

export const QUALIOPI_CERTIFICAT_REALISATION =
  "Certificat de réalisation et attestation de fin de formation délivrés à l'issue de la session.";

export const QUALIOPI_BEWORK_DISTINCTION =
  "BeWork est un service d'externalisation administrative, distinct des actions de formation certifiées Qualiopi d'OFC Création d'Entreprise. Il n'est pas éligible aux financements OPCO.";

export const QUALIOPI_SATISFACTION_SOURCING = `Note calculée sur la base des questionnaires de satisfaction recueillis à l'issue des sessions du ${QUALIOPI_STATS.PERIODE_DEBUT} au ${QUALIOPI_STATS.PERIODE_FIN} — ${QUALIOPI_STATS.NB_REPONDANTS} répondants. Dernière mise à jour : ${QUALIOPI_STATS.DATE_MAJ}.`;

export const QUALIOPI_DISCLAIMER_GAINS =
  "Résultats observés chez nos clients formés. Les gains varient selon l'organisation, les outils en place et le niveau de pratique.";
