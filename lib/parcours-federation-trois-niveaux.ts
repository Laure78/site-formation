/**
 * Parcours IA en 3 niveaux — sessions convoquées par fédérations, réseaux et entreprises.
 * Tarifs HT / participant (catalogue).
 */
import { LINKS } from '@/lib/internal-links';
import {
  DEV_WEB_IA_FORMATION_TITRE,
  TARIF_INTER_DEV_WEB_IA_HT,
} from '@/lib/formation-developpement-web-ia-content';
import {
  libelleTarifParticipantCatalogue,
  SESSION_CONVOQUEE_MIN_PARTICIPANTS,
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV09_HT,
} from '@/lib/tarifs-catalogue-participant';

export const FEDERATION_PARCOURS_EFFECTIF_MIN = SESSION_CONVOQUEE_MIN_PARTICIPANTS;

export type FederationParcoursNiveau = {
  niveau: 1 | 2 | 3;
  title: string;
  formatLabel: string;
  description: string;
  /** Complément niveau 3 (salon / démo). */
  note?: string;
  tarifHtParParticipant: number;
  /** Ex. « par jour » pour le niveau 3. */
  tarifSuffix?: string;
  programmeHref: string;
  programmeLabel: string;
};

export const FEDERATION_PARCOURS_TROIS_NIVEAUX: readonly FederationParcoursNiveau[] = [
  {
    niveau: 1,
    title: 'Niveau 1 — Initiation',
    formatLabel: '4 heures',
    description:
      'Découvrir et utiliser l’IA générative dans les tâches professionnelles du BTP : mails, devis, comptes rendus, documents chantier et premiers cas d’usage métier.',
    tarifHtParParticipant: TARIF_PARTICIPANT_NIV01_HT,
    programmeHref: LINKS.formationIaBtpNiveau1BatimentTp,
    programmeLabel: 'Programme niveau 1 — IA bâtiment et travaux publics',
  },
  {
    niveau: 2,
    title: 'Niveau 2 — Perfectionnement',
    formatLabel: '4 à 7 heures',
    description:
      'Approfondir l’utilisation de l’IA sur les appels d’offres, la conduite de travaux, Claude AI et la maîtrise d’œuvre.',
    tarifHtParParticipant: TARIF_PARTICIPANT_NIV09_HT,
    programmeHref: `${LINKS.formations}#catalogue-niveau-2`,
    programmeLabel: 'Catalogue — formations niveau 2',
  },
  {
    niveau: 3,
    title: DEV_WEB_IA_FORMATION_TITRE,
    formatLabel: '7 heures ou 14 heures',
    description:
      'Concevoir et déployer ses propres applications et outils métier BTP avec l’IA, sans être développeur.',
    note:
      'C’est notamment ce que nous avons évoqué lors de la démonstration réalisée par Mess sur le salon.',
    tarifHtParParticipant: TARIF_INTER_DEV_WEB_IA_HT,
    tarifSuffix: 'par jour',
    programmeHref: LINKS.formationDeveloppementWebIaSansCoder,
    programmeLabel: 'Programme niveau 3 — création et déploiement d’applications métier BTP',
  },
] as const;

export function libelleTarifFederationParParticipant(
  tarifHt: number,
  suffix?: string,
): string {
  const base = libelleTarifParticipantCatalogue(tarifHt);
  return suffix ? `${base} ${suffix}` : base;
}

export const FEDERATION_PARCOURS_INTRO =
  'Tarifs HT / participant pour les sessions convoquées par un réseau ou une entreprise. Minimum 6 participants par session.' as const;
