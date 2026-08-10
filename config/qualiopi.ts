/**
 * Constantes Qualiopi — indicateurs, délais, version fiches.
 * Chiffres formés / note / répondants : source unique `lib/proof.ts`.
 */
import { PROOF, PROOF_PERIODE } from '@/lib/proof';

export const QUALIOPI_STATS = {
  NB_FORMES: PROOF.formes,
  NOTE_MOYENNE: PROOF.note,
  NOTE_MOYENNE_VALEUR: 4.85,
  PERIODE_DEBUT: PROOF_PERIODE.debut,
  PERIODE_FIN: PROOF_PERIODE.fin,
  NB_REPONDANTS: PROOF.repondants,
  DATE_MAJ: PROOF.majLe,
} as const;

export const QUALIOPI_FICHE_META = {
  updatedAt: PROOF.majLe,
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
  "BeWork est un service de plateforme interne BTP (logiciel et accompagnement), distinct des actions de formation certifiées Qualiopi d'OFC Création d'Entreprise. Il n'est pas éligible aux financements OPCO.";

export const QUALIOPI_SATISFACTION_SOURCING = PROOF.mentionSource;

export const QUALIOPI_DISCLAIMER_GAINS =
  "Résultats observés chez nos clients formés. Les gains varient selon l'organisation, les outils en place et le niveau de pratique.";
