/**
 * Portrait Laure Olivié — faits & textes différenciés (source unique).
 * Éviter de recopier ces chaînes ailleurs : importer depuis ce module.
 *
 * @see CV Laure Olivié — Formatrice IA & ChatGPT (juin 2026)
 */
import { getStatsFreshnessLabel } from '@/lib/constants';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';

/** Accroche CV — expertise croisée IA × terrain BTP. */
export const LAURE_OLIVIE_EXPERTISE_TAGLINE =
  'Expertise unique : IA générative × réalités terrain BTP — gestion de chantier, appels d\'offres, DCE, DOE, mémoires techniques.' as const;

/** Résidence professionnelle (CV). Siège OFC : Guyancourt (78). */
export const LAURE_OLIVIE_RESIDENCE = 'Saint-Quentin-en-Yvelines (78)' as const;

/** Références clients & partenaires (affichage court). */
export const LAURE_OLIVIE_CLIENT_REFERENCES_SHORT =
  'FFB Grand Paris, FFB Île-de-France (78, 91, 95), FFB IDF Est, CAPEB, CSFE, CNAM Entreprise (IDF)' as const;

export const LAURE_OLIVIE_CLIENT_REFERENCES = [
  'FFB Grand Paris',
  'FFB Île-de-France (78, 91, 95)',
  'FFB Île-de-France Est',
  'CAPEB',
  'CSFE',
  'CNAM Entreprise (Île-de-France)',
  'Lefebvre Dalloz',
] as const;

export const LAURE_OLIVIE_IA_TOOLS = [
  'ChatGPT',
  'Claude',
  'Copilot 365',
  'Mistral AI',
  'Perplexity',
] as const;

export const LAURE_OLIVIE_FORMATION_THEMES = [
  "L'IA au service du Bâtiment (intra-entreprise)",
  "Niveau 2 — Répondre aux appels d'offres BTP avec l'IA : analyse DCE et mémoires techniques",
  'Créer son assistant IA métier',
] as const;

export const LAURE_OLIVIE_USE_CASES = [
  'administratif',
  'mémoires techniques',
  'DCE',
  'DOE',
  'PPSPS',
  'rapports et comptes rendus de chantier',
  'CCTP',
] as const;

export const LAURE_OLIVIE_PROMPTS_DELIVERY =
  'Kits prompts Excel par corps de métier — réutilisables après la session.' as const;

export const LAURE_OLIVIE_CHATGPT_PRO_MODULES = [
  'Bases de ChatGPT : débutant à expert',
  'Créer du contenu sur LinkedIn avec l\'IA',
  'Automatiser ChatGPT',
] as const;

export const LAURE_OLIVIE_LINKEDIN_LEARNING_COURSES = [
  {
    title: "L'IA pour le BTP : des solutions concrètes pour vos chantiers",
    duration: '35 min',
    topics:
      'fondamentaux IA, devis chantier, assistant GPT, recrutement, communication',
  },
  {
    title: "L'IA pour les artisans et TPE : recruter sa main-d'œuvre efficacement",
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
    body: `Gestion de formations **e-learning** : supervision de la plateforme, coordination logistique et suivi administratif des actions de formation pour les agents publics. **Apprentissage clé** : structurer des parcours adultes, tenir les indicateurs Qualiopi en amont et rendre la pédagogie numérique exploitable sur le terrain.`,
  },
  {
    period: '2017-2024',
    title: 'Dirigeante ALIA BTP — travaux publics & revêtements (Guyancourt)',
    body: `Fondation et direction d'une PME de **terrassement, voirie et revêtements extérieurs** (SIRET 853 687 317 00018). **Management chantier** : suivi performance, délais, aléas. **Recrutement** : tests préalables à l'embauche, formation équipes (sécurité, EPI, sensibilisation IA BTP). **Commercial** : prospection, partenariats, suivi client. **Digital & SEO** : site vitrine, netlinking, ligne éditoriale, réseaux sociaux. **Apprentissage clé** : un outil n'est adopté que s'il fait gagner du temps dès la première semaine.`,
  },
  {
    period: '2021',
    title: 'Master Stratégie d\'entreprise — CNAM Paris',
    body: `Renforcement de la vision stratégique, du pilotage d'organisme et de la structuration d'offres de formation. **Apprentissage clé** : aligner pédagogie, financement et développement commercial sur des objectifs mesurables.`,
  },
  {
    period: '2022',
    title: 'Formatrice IA générative · création d\'OFC Création d\'Entreprise (SASU)',
    body: `Lancement de l'activité **formatrice IA spécialiste BTP** et structuration juridique d'**OFC Création d'Entreprise** — sessions courtes (4 h), intra-entreprise, dans vos locaux, exclusivement en **présentiel en Île-de-France**. Programmes : « L'IA au service du Bâtiment », appels d'offres, assistants métier. ${LAURE_OLIVIE_PROMPTS_DELIVERY} **Apprentissage clé** : Qualiopi et financement OPCO imposent une pédagogie claire et mesurable.`,
  },
  {
    period: '2023',
    title: 'Certification Qualiopi',
    body: `Obtention du référentiel national qualité (NDA ${SCHEMA_CONTACT.nda}). Mise en place des indicateurs de satisfaction, feuilles de présence et bilans pédagogiques. **Apprentissage clé** : transparence sur les objectifs, les résultats et les limites de l'IA en entreprise.`,
  },
  {
    period: '2024-2026',
    title: 'Formation ChatGPT Pro · LinkedIn Learning · partenariats FFB & CAPEB',
    body: `Parcours **ChatGPT Pro** (bases, contenu LinkedIn, automatisation). Publication de **deux cours LinkedIn Learning** sur l'IA appliquée au BTP et aux TPE. Renforcement des partenariats **FFB** (Grand Paris, IDF, IDF Est), **CAPEB**, **CSFE** et **CNAM Entreprise**. **Apprentissage clé** : vulgariser sans trahir le vocabulaire chantier (CCTP, DCE, CR, OS).`,
  },
  {
    period: '2026',
    title: 'Satisfaction mesurée · indicateurs Qualiopi publiés',
    body: `Chiffres consolidés sur les sessions OFC (${LAURE_OLIVIE_STATS_FRESHNESS}) : ${formatNoteSatisfactionAffichageComplet()} — questionnaires de fin de formation. Parcours intra-entreprise, dans vos locaux en Île-de-France, financement **Constructys** selon éligibilité.`,
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
  const base = `Formatrice IA générative spécialiste BTP depuis 2022, Laure Olivié s'appuie sur 10 ans de terrain BTP (conductrice de travaux, dirigeante d'ALIA BTP 2017-2024), une expérience de chargée de formation au CNFPT (2009-2019) et le rôle d'instructrice LinkedIn Learning. ${formatNoteSatisfactionAffichageComplet()} sur les sessions OFC (${getStatsFreshnessLabel()}). Outils : ${LAURE_OLIVIE_IA_TOOLS.slice(0, 3).join(', ')} et ${LAURE_OLIVIE_IA_TOOLS[3]} — devis, DCE, CCTP, CR chantier et mémoires techniques. OFC Création d'Entreprise est certifié Qualiopi (NDA ${SCHEMA_CONTACT.nda}), finançable Constructys selon éligibilité.`;
  return contextLine ? `${contextLine} ${base}` : base;
}

/** Bio blog — angle expertise éditoriale & références institutionnelles. */
export function getLaureOlivieArticleAuthorBio(): string {
  return `Après 10 ans de terrain BTP (conduite de travaux et direction d'entreprise en Île-de-France), Laure Olivié est formatrice IA générative spécialiste BTP depuis 2022. OFC Création d'Entreprise est certifié Qualiopi — ${formatNoteSatisfactionAffichageComplet()}. Partenaires FFB, CAPEB et CSFE. Instructrice LinkedIn Learning.`;
}

/** Bio auteure fiches formation — angle crédibilité & lien /a-propos. */
export function getLaureOlivieAuthorBioBody(): string {
  return `est formatrice IA générative spécialiste BTP et fondatrice d'OFC Création d'Entreprise, organisme certifié Qualiopi (NDA ${SCHEMA_CONTACT.nda}). Parcours : CNFPT (formation e-learning, 2009-2019), dirigeante ALIA BTP (2017-2024), instructrice LinkedIn Learning. ${formatNoteSatisfactionAffichageComplet()} (${getStatsFreshnessLabel()}). Outils enseignés : ${LAURE_OLIVIE_IA_TOOLS.join(', ')}.`;
}

/** Description JSON-LD Person — schémas globaux. */
export function getLaureOlivieSchemaPersonDescription(): string {
  return `Formatrice IA spécialisée BTP. Après 10 ans de terrain comme conductrice de travaux et direction d'ALIA BTP (2017-2024). Instructrice LinkedIn Learning, organisme certifié Qualiopi. ${formatNoteSatisfactionAffichageComplet()}. Partenaires : FFB Grand Paris, CSFE, UMB-FFB.`;
}

/** Intro E-E-A-T page /a-propos — angle mission & double compétence. */
export function getLaureOlivieEeatIntro(): string {
  return `Je suis Laure Olivié, formatrice IA générative spécialiste BTP depuis 2022 — après 10 ans de terrain BTP (conduite de travaux et direction d'ALIA BTP), et une première expérience de chargée de formation au CNFPT (2009-2019). J'accompagne les équipes BTP sur leurs tâches réelles : comptes rendus, devis, appels d'offres, DCE, DOE, PPSPS et coordination chantier. ${formatNoteSatisfactionAffichageComplet()} sur les sessions OFC. Mon approche croise le terrain BTP, la pédagogie adulte et la certification Qualiopi — pas la tech pour la tech.`;
}
