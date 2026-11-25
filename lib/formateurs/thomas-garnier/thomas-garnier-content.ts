/**
 * Contenu éditorial — fiche `/formateurs/thomas-garnier` (vérifié, sans invention).
 */
import type { FAQItem } from '@/lib/faq';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';

export const THOMAS_GARNIER_SLUG = 'thomas-garnier' as const;

export const THOMAS_GARNIER_PATH = `/formateurs/${THOMAS_GARNIER_SLUG}` as const;

export const THOMAS_GARNIER_METADATA = {
  title: 'Thomas Garnier | Formateur chiffrage et appels d’offres BTP',
  description:
    'Thomas Garnier, 12 ans d’expérience en gestion d’affaires BTP. Formations devis, chiffrage et mémoires techniques en présentiel en Île-de-France.',
} as const;

export const THOMAS_GARNIER_EN_BREF =
  'Thomas Garnier est formateur pour OFC Création d’Entreprise (marque commerciale Laure Olivié), organisme certifié Qualiopi. Ancien chargé d’affaires BTP (12 ans), il forme les dirigeants, chargés d’affaires et équipes commerciales des PME du bâtiment sur le devis, le chiffrage et les réponses aux appels d’offres — présentiel en Île-de-France, deux modules catalogue ouverture 2027.';

export const THOMAS_FORMATIONS_SECTION_ID = 'thomas-formations' as const;

export const THOMAS_EXPERTISE_CARDS = [
  {
    key: 'devis',
    title: 'Devis et chiffrage',
    body: 'Structurer les devis, identifier les postes de coûts et construire des offres commerciales cohérentes.',
  },
  {
    key: 'dce',
    title: 'Analyse des DCE',
    body: 'Identifier les exigences techniques, administratives et commerciales d’un dossier de consultation.',
  },
  {
    key: 'memoire',
    title: 'Mémoires techniques',
    body: 'Structurer une réponse adaptée aux attentes du maître d’ouvrage et aux critères d’évaluation du marché.',
  },
  {
    key: 'offres',
    title: 'Offres commerciales',
    body: 'Présenter les savoir-faire de l’entreprise et améliorer la lisibilité des propositions adressées aux clients.',
  },
] as const;

export const THOMAS_PROBLEMATIQUES = [
  'Vos devis sont difficiles à structurer ou à fiabiliser.',
  'Vous manquez de temps pour analyser les dossiers de consultation.',
  'Vos mémoires techniques sont trop génériques.',
  'Vous souhaitez mieux valoriser vos moyens humains et techniques.',
  'Vous souhaitez harmoniser les méthodes commerciales de vos chargés d’affaires.',
] as const;

export const THOMAS_CHARGEAFFAIRES_ACTIVITES = [
  'Analyse des dossiers de consultation.',
  'Chiffrage des prestations.',
  'Préparation des offres commerciales.',
  'Rédaction de mémoires techniques.',
  'Suivi client.',
] as const;

export const THOMAS_PUBLIC_CIBLE = [
  'Dirigeants de PME du BTP',
  'Chargés d’affaires',
  'Responsables études de prix',
  'Techniciens études de prix',
  'Conducteurs de travaux',
  'Collaborateurs chargés des réponses aux appels d’offres',
] as const;

/** Formations IA OFC — distinctes des modules Thomas (parcours 2027). */
export const THOMAS_FORMATIONS_OFC_LINKS = [
  {
    href: LINKS.iaDevis,
    label: 'Formation IA devis et chiffrage BTP',
    hint: 'Catalogue IA — ChatGPT et Claude appliqués au devis.',
  },
  {
    href: LINKS.formationIaAppelsOffresBtp,
    label: 'Formation IA appels d’offres et DCE',
    hint: 'Catalogue IA — analyse DCE et mémoires techniques.',
  },
  {
    href: LINKS.parcoursChargeAffairesBtp,
    label: 'Parcours chargé d’affaires BTP',
    hint: 'Parcours métier catalogue 2027.',
  },
  {
    href: LINKS.parcoursDirigeantPmeBtp,
    label: 'Parcours dirigeant de PME BTP',
    hint: 'Parcours métier catalogue 2027.',
  },
  {
    href: LINKS.ressources,
    label: 'Ressources et guides IA BTP',
    hint: 'Guides et tutoriels gratuits OFC.',
  },
] as const;

export const THOMAS_GUIDES_LINKS = [
  { href: LINKS.blogAnalyseDceNotebooklm, label: 'Analyser un DCE avec l’IA' },
  { href: LINKS.blogAnalyserCctpMethode20Min, label: 'Méthode d’analyse CCTP et CCAP' },
  { href: LINKS.tutoAnalyseDce, label: 'Tutoriel analyse DCE' },
  { href: LINKS.tutoMemoireTechnique, label: 'Rédiger un mémoire technique' },
  { href: LINKS.guideRepondreAoBtpOfc2026, label: 'Préparer un appel d’offres BTP' },
] as const;

export const FORMATION_CATEGORY: Record<string, string> = {
  'COM-01': 'Devis et chiffrage BTP',
  'COM-04': 'Appels d’offres BTP',
};

export const FORMATION_ACCROCHES: Record<string, string> = {
  'COM-01':
    'Construisez des devis plus structurés et mieux adaptés aux enjeux économiques de vos chantiers.',
  'COM-04':
    'Construisez des mémoires techniques qui répondent aux attentes du maître d’ouvrage et valorisent les compétences de votre entreprise.',
};

export const FORMATION_THEMES: Record<string, readonly string[]> = {
  'COM-01': [
    'Identification des postes de coûts',
    'Structuration des devis',
    'Cohérence des prix de vente',
    'Présentation des offres commerciales',
  ],
  'COM-04': [
    'Identification des exigences du DCE',
    'Compréhension des critères d’évaluation',
    'Structuration du mémoire technique',
    'Valorisation des moyens humains et matériels',
    'Personnalisation de la réponse technique',
  ],
};

export function getThomasGarnierFaqItems(): readonly FAQItem[] {
  return [
    {
      q: 'Qui est Thomas Garnier ?',
      a: 'Thomas Garnier est un formateur spécialisé dans les devis, le chiffrage et les réponses aux appels d’offres dans le BTP. Il dispose de 12 ans d’expérience en tant que chargé d’affaires dans des entreprises du bâtiment.',
    },
    {
      q: 'Quelles formations propose Thomas Garnier ?',
      a: 'Deux modules du catalogue parcours 2027 sont prévus : Construire des devis clairs et rentables (COM-01) et Rédiger un mémoire technique adapté aux critères du marché (COM-04). Ouverture prévue en 2027.',
    },
    {
      q: 'Pourquoi se former au chiffrage dans le BTP ?',
      a: 'Une formation au chiffrage permet de mieux structurer les devis, de comprendre les composantes des coûts et d’améliorer la cohérence des offres commerciales.',
    },
    {
      q: 'Pourquoi adapter son mémoire technique aux critères du marché ?',
      a: 'Un mémoire technique personnalisé permet de répondre plus précisément aux exigences de la consultation et de présenter les moyens, méthodes et compétences de l’entreprise.',
    },
    {
      q: 'À qui s’adressent ces formations ?',
      a: 'Ces formations s’adressent principalement aux dirigeants, chargés d’affaires, responsables études de prix et collaborateurs des PME du bâtiment et des travaux publics.',
    },
    {
      q: 'Où se déroulent les formations ?',
      a: 'Les formations sont prévues exclusivement en présentiel en Île-de-France, en inter-entreprises et en intra-entreprise dans les locaux de l’entreprise.',
    },
    {
      q: 'Quel organisme propose ces formations ?',
      a: 'Les formations sont proposées par OFC Création d’Entreprise, dont Laure Olivié est la marque commerciale. L’organisme est certifié Qualiopi au titre des actions de formation.',
    },
    {
      q: 'Une prise en charge par Constructys est-elle possible ?',
      a: `${FINANCEMENT_FORMULATION_PRUDENTE} Voir le <a href="${LINKS.financement}">guide financement Constructys</a> pour les conditions applicables.`,
    },
  ];
}