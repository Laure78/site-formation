/**
 * Parcours IA en 3 niveaux — sessions convoquées par fédérations, réseaux et entreprises.
 * Tarifs HT par participant (pas de forfait groupe).
 */
import { LINKS } from '@/lib/internal-links';
import {
  DEV_WEB_IA_FORMATION_TITRE,
  TARIF_INTER_DEV_WEB_IA_HT,
} from '@/lib/formation-developpement-web-ia-content';
import {
  SESSION_CONVOQUEE_MIN_PARTICIPANTS,
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV09_HT,
} from '@/lib/tarifs-catalogue-participant';
import { formatTarifHt } from '@/lib/tarifs-sessions';

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
    title: 'Niveau 1 – Découvrir et utiliser l’IA dans son activité',
    formatLabel: '4 heures',
    description:
      'Prise en main de ChatGPT et Claude. Applications concrètes : mails, devis, comptes rendus, documents chantier et premiers cas d’usage métier.',
    tarifHtParParticipant: TARIF_PARTICIPANT_NIV01_HT,
    programmeHref: LINKS.formationIaBtpNiveau1BatimentTp,
    programmeLabel: 'Programme niveau 1 — IA bâtiment et travaux publics',
  },
  {
    niveau: 2,
    title: 'Niveau 2 – Créer ses assistants IA personnalisés',
    formatLabel: '7 heures',
    description:
      'Création d’assistants adaptés aux besoins de l’entreprise : devis, analyse de documents, préparation de chantier, appels d’offres, suivi client, etc.',
    tarifHtParParticipant: TARIF_PARTICIPANT_NIV09_HT,
    programmeHref: LINKS.formationAssistantsIaPersonnalisesBtp,
    programmeLabel: 'Programme niveau 2 — assistants IA personnalisés BTP',
  },
  {
    niveau: 3,
    title: DEV_WEB_IA_FORMATION_TITRE,
    formatLabel: '7 heures ou 14 heures',
    description:
      'Création d’un site, d’une application ou d’un outil métier grâce à l’IA.',
    note:
      'C’est notamment ce que nous avons évoqué lors de la démonstration réalisée par Mess sur le salon.',
    tarifHtParParticipant: TARIF_INTER_DEV_WEB_IA_HT,
    tarifSuffix: 'par jour',
    programmeHref: LINKS.formationDeveloppementWebIaSansCoder,
    programmeLabel: 'Programme niveau 3 — outils de gestion BTP avec l’IA',
  },
] as const;

export function libelleTarifFederationParParticipant(
  tarifHt: number,
  suffix?: string,
): string {
  const base = `${formatTarifHt(tarifHt)} € HT par participant`;
  return suffix ? `${base} ${suffix}` : base;
}

export const FEDERATION_PARCOURS_INTRO =
  'Tarifs HT par participant pour les sessions convoquées par un réseau ou une entreprise — sans forfait groupe. Minimum 6 participants par session.' as const;
