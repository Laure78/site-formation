/**
 * Portrait Laure Olivié — faits & textes différenciés (source unique).
 * Éviter de recopier ces chaînes ailleurs : importer depuis ce module.
 *
 * @see CV Laure Olivié — Formatrice IA & ChatGPT (juin 2026)
 */
import { formatPersonnesFormeesCount, getStatsFreshnessLabel, SOCIAL_PROOF } from '@/lib/constants';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';

/** Références clients & partenaires (affichage court). */
export const LAURE_OLIVIE_CLIENT_REFERENCES_SHORT =
  'FFB Grand Paris, FFB Île-de-France (78, 91, 95), FFB IDF Est, CAPEB, CSFE, CNAM Entreprise, Lefebvre Dalloz' as const;

export const LAURE_OLIVIE_CLIENT_REFERENCES = [
  'FFB Grand Paris',
  'FFB Île-de-France (78, 91, 95)',
  'FFB Île-de-France Est',
  'CAPEB',
  'CSFE',
  'CNAM Entreprise',
  'Lefebvre Dalloz',
] as const;

export const LAURE_OLIVIE_IA_TOOLS = [
  'ChatGPT',
  'Claude',
  'Microsoft Copilot 365',
  'Mistral AI',
  'Perplexity',
] as const;

export const LAURE_OLIVIE_FORMATION_THEMES = [
  "L'IA au service du Bâtiment (intra / inter)",
  "Répondre aux appels d'offres BTP avec l'IA",
  'Créer son assistant IA métier',
] as const;

export const LAURE_OLIVIE_USE_CASES = [
  'administratif',
  'mémoires techniques',
  'DCE',
  'DOE',
  'PPSPS',
  'comptes rendus de chantier',
  'CCTP',
] as const;

export const LAURE_OLIVIE_LINKEDIN_LEARNING_COURSES = [
  {
    title: "L'IA pour le BTP : Des solutions concrètes pour vos chantiers",
    duration: '35 min',
    topics:
      'fondamentaux IA, devis chantier, assistant GPT, recrutement, communication',
  },
  {
    title: "L'IA pour les artisans et TPE : Recruter sa main-d'œuvre efficacement",
    duration: '16 min',
    topics: "annonces d'emploi, tri CV, entretien, fidélisation, QCM pré-qualification",
  },
] as const;

/** Mention de fraîcheur des chiffres publics (alignée sur `getStatsFreshnessLabel`). */
export const LAURE_OLIVIE_STATS_FRESHNESS = getStatsFreshnessLabel();

/** Parcours chronologique — page /a-propos (Timeline) & GEO. */
export const LAURE_OLIVIE_PARCOURS_TIMELINE = [
  {
    period: '2009-2019',
    title: 'Chargée de formation — CNFPT Grande Couronne',
    body: `Supervision de la **plateforme e-learning**, coordination logistique et suivi administratif des actions de formation pour les agents publics. **Apprentissage clé** : structurer des parcours adultes, tenir les indicateurs Qualiopi en amont et rendre la pédagogie numérique exploitable sur le terrain.`,
  },
  {
    period: '2017-2024',
    title: 'Dirigeante ALIA BTP — travaux publics & revêtements (Guyancourt)',
    body: `Fondation et direction d'une PME de **terrassement, voirie et revêtements extérieurs** (SIRET 853 687 317 00018). Management chantier, respect des délais, gestion des aléas, recrutement, formation sécurité (EPI) et développement commercial. **Apprentissage clé** : un outil n'est adopté que s'il fait gagner du temps dès la première semaine.`,
  },
  {
    period: '2021',
    title: 'Master Stratégie d\'entreprise — CNAM Paris',
    body: `Renforcement de la vision stratégique, du pilotage d'organisme et de la structuration d'offres de formation. **Apprentissage clé** : aligner pédagogie, financement et développement commercial sur des objectifs mesurables.`,
  },
  {
    period: '2022',
    title: 'Création d\'OFC Création d\'Entreprise (SASU)',
    body: `Organisme dédié à la **formation IA pour les pro du BTP** — sessions courtes (4 h), inter et intra, exclusivement en présentiel en Île-de-France. Kits prompts et cas d'usage par corps de métier. **Apprentissage clé** : Qualiopi et financement OPCO imposent une pédagogie claire et mesurable.`,
  },
  {
    period: '2023',
    title: 'Certification Qualiopi',
    body: `Obtention du référentiel national qualité (NDA ${SCHEMA_CONTACT.nda}). Mise en place des indicateurs de satisfaction, feuilles de présence et bilans pédagogiques. **Apprentissage clé** : transparence sur les objectifs, les résultats et les limites de l'IA en entreprise.`,
  },
  {
    period: '2024-2026',
    title: 'Instructrice LinkedIn Learning · présidence OFC · partenariats FFB',
    body: `Publication de **deux cours LinkedIn Learning** sur l'IA appliquée au BTP et aux TPE. Renforcement des partenariats FFB (Grand Paris, IDF, IDF Est), CSFE, CAPEB et CNAM. Formation continue **ChatGPT Pro** (automatisation, contenu LinkedIn). **Apprentissage clé** : vulgariser sans trahir le vocabulaire chantier (CCTP, DCE, CR, OS).`,
  },
  {
    period: '2026',
    title: `${formatPersonnesFormeesCount()} professionnels formés · ${SOCIAL_PROOF.AVERAGE_RATING}`,
    body: `Chiffres consolidés sur les sessions OFC (${LAURE_OLIVIE_STATS_FRESHNESS}) : effectifs et satisfaction mesurés sur les questionnaires de fin de formation — parcours inter et intra en Île-de-France.`,
  },
] as const;

/** Parcours condensé — fil d'Ariane visuel secondaire (AProposParcoursTimeline). */
export const LAURE_OLIVIE_PARCOURS_CONDENSE = LAURE_OLIVIE_PARCOURS_TIMELINE.map((step) => ({
  datetime: step.period,
  title: step.title,
  body: step.body.replace(/\*\*/g, ''),
}));

/** Bio courte — encart formations (E-E-A-T, angle pédagogie & terrain). */
export function getLaureOlivieFormationPortraitParagraph(contextLine?: string): string {
  const base = `Formatrice IA générative spécialiste BTP depuis 2022, Laure Olivié cumule une expérience de chargée de formation au CNFPT (2009-2019), de dirigeante d'ALIA BTP (2017-2024) et d'instructrice LinkedIn Learning. Elle a formé ${formatPersonnesFormeesCount()} professionnels du bâtiment et des travaux publics (${SOCIAL_PROOF.AVERAGE_RATING}, ${getStatsFreshnessLabel()}) sur ChatGPT, Claude, Copilot et Mistral — devis, DCE, CCTP, CR chantier et mémoires techniques. OFC Création d'Entreprise est certifié Qualiopi (NDA ${SCHEMA_CONTACT.nda}), finançable Constructys selon éligibilité.`;
  return contextLine ? `${contextLine} ${base}` : base;
}

/** Bio blog — angle expertise éditoriale & références institutionnelles. */
export function getLaureOlivieArticleAuthorBio(): string {
  return `Après dix ans de conduite de travaux et de direction d'ALIA BTP (travaux publics, Île-de-France), Laure Olivié forme les équipes du BTP à l'IA générative depuis 2022. Master Stratégie d'entreprise (CNAM, 2021), instructrice LinkedIn Learning, ${formatPersonnesFormeesCount()} pros formés · ${SOCIAL_PROOF.AVERAGE_RATING}. Références : ${LAURE_OLIVIE_CLIENT_REFERENCES_SHORT}.`;
}

/** Bio auteure fiches formation — angle crédibilité & lien /a-propos. */
export function getLaureOlivieAuthorBioBody(): string {
  return `est formatrice IA générative spécialiste BTP et fondatrice d'OFC Création d'Entreprise, organisme certifié Qualiopi (NDA ${SCHEMA_CONTACT.nda}). Parcours : CNFPT (formation e-learning, 2009-2019), dirigeante ALIA BTP (2017-2024), instructrice LinkedIn Learning. ${formatPersonnesFormeesCount()} professionnels formés · ${SOCIAL_PROOF.AVERAGE_RATING} (${getStatsFreshnessLabel()}). Outils enseignés : ${LAURE_OLIVIE_IA_TOOLS.slice(0, 4).join(', ')}.`;
}

/** Description JSON-LD Person — schémas globaux. */
export function getLaureOlivieSchemaPersonDescription(): string {
  return `Formatrice IA générative spécialiste BTP. Ex-dirigeante ALIA BTP (2017-2024), ex-chargée de formation CNFPT (2009-2019). Master CNAM Stratégie d'entreprise (2021). Instructrice LinkedIn Learning. ${formatPersonnesFormeesCount()} professionnels formés, ${SOCIAL_PROOF.AVERAGE_RATING}. Qualiopi. Clients : ${LAURE_OLIVIE_CLIENT_REFERENCES_SHORT}.`;
}

/** Intro E-E-A-T page /a-propos — angle mission & double compétence. */
export function getLaureOlivieEeatIntro(): string {
  return `Je suis Laure Olivié, formatrice IA spécialisée bâtiment depuis 2022 — après dix ans de conduite de travaux et de direction d'ALIA BTP, et une première expérience de chargée de formation au CNFPT (2009-2019). J'ai formé ${formatPersonnesFormeesCount()} professionnels du BTP à utiliser l'IA sur leurs tâches réelles : comptes rendus, devis, appels d'offres, DCE, DOE, PPSPS et coordination chantier. Mon approche croise le terrain BTP, la pédagogie adulte et la certification Qualiopi — pas la tech pour la tech.`;
}
