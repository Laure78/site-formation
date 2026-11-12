/**
 * Contenus éditoriaux par fiche parcours — hero, bénéfices, pédagogie, analytics.
 * Le layout est unique : `ParcoursMetierTemplate`.
 */
import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Briefcase,
  CalendarCheck,
  Coins,
  FileText,
  HardHat,
  Layers,
  Shield,
  Sparkles,
} from 'lucide-react';
import type { ParcoursId } from '@/data/catalogue-2027';

export type ParcoursMetierBenefitCard = {
  icon: LucideIcon;
  titre: string;
  texte: string;
};

export type ParcoursMetierPedagogyCard = {
  icon: LucideIcon;
  titre: string;
  texte: string;
};

export type ParcoursMetierModuleIllustration = {
  src: string;
  alt: string;
};

export type ParcoursMetierTemplateContent = {
  heroImage: { src: string; alt: string };
  /** Sous le bénéfice (hero) — public / utilité du parcours. */
  heroDescription: string;
  heroFigcaption?: string;
  apprentissageCards: readonly ParcoursMetierBenefitCard[];
  pedagogyCards: readonly ParcoursMetierPedagogyCard[];
  modulesSectionId: string;
  /** Préfixe `src` GA4 — ex. `parcours-conducteur-de-travaux`. */
  ctaAnalyticsPrefix: string;
  /** Illustrations optionnelles en tête de carte module (référent IA). */
  moduleIllustrations?: Partial<Record<string, ParcoursMetierModuleIllustration>>;
};

const PEDAGOGIE_BG_DEFAULT = '/images/accueil/03-parcours-metiers-chantier.webp';

export const PARCOURS_METIER_PEDAGOGIE_BACKGROUND = PEDAGOGIE_BG_DEFAULT;

const REFERENT_IMG_BASE = '/images/parcours/referent-ia-btp';

export const PARCOURS_METIER_TEMPLATE_BY_ID: Record<ParcoursId, ParcoursMetierTemplateContent> = {
  'conducteur-de-travaux': {
    heroImage: {
      src: '/images/conducteur-de-travaux-photo-hero.webp',
      alt: 'Conducteur de travaux sur chantier, casqué, consultant une tablette devant une grue et un bâtiment en construction',
    },
    heroDescription:
      'Un parcours concret et modulable pour conducteurs, aides-conducteurs et chefs de chantier en évolution.',
    apprentissageCards: [
      {
        icon: BarChart3,
        titre: 'Préparer le chantier',
        texte: 'Anticiper la passation, l’ouverture et les points critiques avant démarrage.',
      },
      {
        icon: CalendarCheck,
        titre: 'Piloter l’exécution',
        texte: 'Planifier, coordonner les équipes et actualiser les délais.',
      },
      {
        icon: Sparkles,
        titre: 'Sécuriser la clôture',
        texte: 'Préparer la réception, les réserves, le DOE et le suivi de fin de chantier.',
      },
    ],
    pedagogyCards: [
      {
        icon: HardHat,
        titre: 'Cas pratiques issus du terrain',
        texte: 'Mises en situation sur des opérations de conduite de travaux.',
      },
      {
        icon: FileText,
        titre: 'Documents métier et exemples concrets',
        texte: 'Passation, plannings, tableaux de suivi et pièces de clôture.',
      },
      {
        icon: Layers,
        titre: 'Livrables réutilisables sur chantier',
        texte: 'Checklists, modèles et trames exploitables après la formation.',
      },
      {
        icon: Shield,
        titre: 'Validation humaine des propositions IA',
        texte: 'Contrôle systématique des contenus sensibles et contractuels.',
      },
    ],
    modulesSectionId: 'conducteur-parcours-modules',
    ctaAnalyticsPrefix: 'parcours-conducteur-de-travaux',
  },
  'dirigeant-pme-btp': {
    heroImage: {
      src: '/images/dirigeant-pme-btp-photo-hero.webp',
      alt: 'Deux professionnels du BTP analysent un chantier sur tablette',
    },
    heroDescription:
      'Un parcours concret et modulable pour dirigeants, associés et futurs repreneurs du BTP.',
    apprentissageCards: [
      {
        icon: BarChart3,
        titre: 'Sécuriser la rentabilité',
        texte:
          'Calculer et fixer vos prix, puis piloter les marges chantier par chantier — compétences du parcours sur les coûts et le pilotage financier.',
      },
      {
        icon: CalendarCheck,
        titre: 'Piloter l’activité',
        texte:
          'Organiser la trésorerie, préparer négociations et relances, manager une équipe de chantier — le fil conducteur du quotidien de direction.',
      },
      {
        icon: Sparkles,
        titre: 'Intégrer l’IA de façon maîtrisée',
        texte:
          'Définir les usages prioritaires, les règles d’usage et un plan de déploiement, avec contrôles et validation humaine sur les contenus sensibles.',
      },
    ],
    pedagogyCards: [
      {
        icon: HardHat,
        titre: 'Cas pratiques du terrain',
        texte: 'Exercices sur situations professionnelles anonymisées.',
      },
      {
        icon: FileText,
        titre: 'Documents métier',
        texte: 'Travail sur devis, tableaux, courriers et outils du quotidien BTP.',
      },
      {
        icon: Layers,
        titre: 'Livrables réutilisables',
        texte: 'Grilles, modèles et checklists exploitables après la formation.',
      },
      {
        icon: Shield,
        titre: 'Validation humaine des propositions de l’IA',
        texte: 'Contrôle systématique des montants, engagements et contenus sensibles.',
      },
    ],
    modulesSectionId: 'dirigeant-parcours-modules',
    ctaAnalyticsPrefix: 'parcours-dirigeant-pme-btp',
  },
  'charge-affaires-btp': {
    heroImage: {
      src: '/images/charge-affaires-btp-photo-hero.jpg',
      alt: 'Chargé d’affaires BTP en réunion, analysant un dossier de marché avec un collègue',
    },
    heroDescription:
      'Un parcours modulaire pour chargés d’affaires, technico-commerciaux et collaborateurs commerciaux BTP — suivez l’ensemble ou ne retenez que les modules utiles à votre situation, sous réserve des prérequis.',
    apprentissageCards: [
      {
        icon: Coins,
        titre: 'Chiffrer et négocier',
        texte:
          'Construire des devis clairs et rentables, préparer négociations et relances sans perdre de marge.',
      },
      {
        icon: FileText,
        titre: 'Répondre aux marchés',
        texte:
          'Analyser un DCE, structurer la candidature et rédiger un mémoire technique aligné sur les critères.',
      },
      {
        icon: BarChart3,
        titre: 'Piloter la rentabilité',
        texte:
          'Suivre avenants, travaux supplémentaires et réclamations, puis piloter les marges par chantier.',
      },
    ],
    pedagogyCards: [
      {
        icon: Briefcase,
        titre: 'Cas pratiques issus du terrain',
        texte: 'Devis, consultations et dossiers d’affaires sur des situations réelles.',
      },
      {
        icon: FileText,
        titre: 'Documents métier et exemples concrets',
        texte: 'DCE, devis, mémoires techniques et pièces de suivi d’affaire.',
      },
      {
        icon: Layers,
        titre: 'Livrables réutilisables sur chantier',
        texte: 'Trames, grilles et checklists exploitables après la formation.',
      },
      {
        icon: Shield,
        titre: 'Validation humaine des propositions IA',
        texte: 'Contrôle systématique des contenus sensibles, chiffrages et engagements.',
      },
    ],
    modulesSectionId: 'charge-affaires-parcours-modules',
    ctaAnalyticsPrefix: 'parcours-charge-affaires-btp',
  },
  'assistant-de-gestion-btp': {
    heroImage: {
      src: '/images/parcours/assistant-gestion-btp.webp',
      alt: 'Assistante de gestion BTP au bureau, organisant dossiers et factures avec un ordinateur',
    },
    heroDescription:
      'Un parcours concret et modulable pour assistants administratifs, gestionnaires et fonctions support du BTP.',
    apprentissageCards: [
      {
        icon: BarChart3,
        titre: 'Structurer l’administratif',
        texte: 'Organiser dossiers chantier, pièces et suivi documentaire au quotidien.',
      },
      {
        icon: CalendarCheck,
        titre: 'Fiabiliser la facturation',
        texte: 'Préparer le circuit de facturation, situations de travaux et relances.',
      },
      {
        icon: Sparkles,
        titre: 'Gagner en efficacité',
        texte: 'Exploiter l’IA et Excel sur les tâches répétitives, avec validation humaine.',
      },
    ],
    pedagogyCards: [
      {
        icon: HardHat,
        titre: 'Cas pratiques issus du terrain',
        texte: 'Situations administratives et de suivi chantier anonymisées.',
      },
      {
        icon: FileText,
        titre: 'Documents métier et exemples concrets',
        texte: 'Courriers, relances, factures et tableaux de suivi.',
      },
      {
        icon: Layers,
        titre: 'Livrables réutilisables',
        texte: 'Modèles, trames et checklists réinvestissables après la formation.',
      },
      {
        icon: Shield,
        titre: 'Validation humaine des propositions IA',
        texte: 'Contrôle systématique des montants et contenus sensibles.',
      },
    ],
    modulesSectionId: 'assistant-gestion-parcours-modules',
    ctaAnalyticsPrefix: 'parcours-assistant-de-gestion-btp',
  },
  'referent-ia-btp': {
    heroImage: {
      src: `${REFERENT_IMG_BASE}/01-referent-ia-btp-chantier-hero.webp`,
      alt: 'Professionnel du BTP avec casque et gilet haute visibilité utilisant un ordinateur portable sur chantier — visuel d’illustration',
    },
    heroDescription:
      'Pour profils déjà à l’aise avec l’IA qui veulent structurer appels d’offres, outils métier et pilotage des usages en entreprise BTP.',
    heroFigcaption:
      'Visuels d’illustration (générés) — pas le reportage d’une session réelle.',
    apprentissageCards: [
      {
        icon: FileText,
        titre: 'Analyser les appels d’offres',
        texte: 'Structurer l’analyse DCE et les usages IA pour répondre aux marchés.',
      },
      {
        icon: Layers,
        titre: 'Créer des outils métier avec l’IA',
        texte: 'Prototyper et documenter un usage IA adapté à votre entreprise BTP.',
      },
      {
        icon: BarChart3,
        titre: 'Piloter les usages de l’IA',
        texte: 'Encadrer le déploiement : règles, validation humaine et feuille de route.',
      },
    ],
    pedagogyCards: [
      {
        icon: HardHat,
        titre: 'Cas réels BTP',
        texte: 'Mises en situation et exercices sur documents métier anonymisés.',
      },
      {
        icon: FileText,
        titre: 'Documents métier',
        texte: 'DCE, prototypes d’applications et dossiers de déploiement IA.',
      },
      {
        icon: Layers,
        titre: 'Livrables réutilisables',
        texte: 'Modèles et méthodes que vous réinvestissez après la formation.',
      },
      {
        icon: Shield,
        titre: 'Confidentialité et contrôle humain',
        texte: 'Validation humaine systématique des contenus sensibles ou contractuels.',
      },
    ],
    modulesSectionId: 'referent-ia-parcours-modules',
    ctaAnalyticsPrefix: 'parcours-referent-ia-btp',
    moduleIllustrations: {
      'NUM-02': {
        src: `${REFERENT_IMG_BASE}/02-ia-appels-offres-dce-btp.webp`,
        alt: 'Illustration thématique pour le module NUM-02 — usage pédagogique',
      },
      'NUM-03': {
        src: `${REFERENT_IMG_BASE}/03-maitriser-claude-ia-btp.webp`,
        alt: 'Illustration thématique pour le module NUM-03 — usage pédagogique',
      },
      'NUM-04': {
        src: `${REFERENT_IMG_BASE}/04-creer-applications-metier-btp.webp`,
        alt: 'Illustration thématique pour le module NUM-04 — usage pédagogique',
      },
      'DIR-05': {
        src: `${REFERENT_IMG_BASE}/05-piloter-ia-entreprise-btp.webp`,
        alt: 'Illustration thématique pour le module DIR-05 — usage pédagogique',
      },
    },
  },
  'maitre-oeuvre': {
    heroImage: {
      src: '/images/conducteur-de-travaux-photo-hero.webp',
      alt: 'Maître d’œuvre sur opération de construction, casqué, consultant des plans sur tablette',
    },
    heroDescription:
      'Un parcours en quatre modules — initiation, MOE/MOEX, Claude et assistants — pour professionnels de la maîtrise d’œuvre en Île-de-France.',
    apprentissageCards: [
      {
        icon: FileText,
        titre: 'Sécuriser le dossier MOE',
        texte: 'Analyser pièces, CR et réserves avec l’IA — validation humaine systématique.',
      },
      {
        icon: Layers,
        titre: 'Industrialiser avec Claude',
        texte: 'Projects, skills et trames réutilisables sur vos documents MOE.',
      },
      {
        icon: Sparkles,
        titre: 'Déployer des assistants',
        texte: 'Concevoir un assistant métier cadré (sources, garde-fous, contrôles).',
      },
    ],
    pedagogyCards: [
      {
        icon: HardHat,
        titre: 'Cas MOE issus du terrain',
        texte: 'Dossiers anonymisés : CR, OS, réserves, synthèses.',
      },
      {
        icon: FileText,
        titre: 'Documents contractuels',
        texte: 'Trames et méthodes sans engagement automatique.',
      },
      {
        icon: Layers,
        titre: 'Livrables réutilisables',
        texte: 'Modèles exploitables après chaque session.',
      },
      {
        icon: Shield,
        titre: 'Confidentialité et contrôle',
        texte: 'Données autorisées et validation humaine avant diffusion.',
      },
    ],
    modulesSectionId: 'maitre-oeuvre-parcours-modules',
    ctaAnalyticsPrefix: 'parcours-maitre-oeuvre',
  },
  'amo-btp': {
    heroImage: {
      src: '/images/parcours/charge-affaires-btp.webp',
      alt: 'Professionnel AMO au bureau avec dossiers de consultation pour une opération travaux',
    },
    heroDescription:
      'Initiation IA, assistance à maîtrise d’ouvrage et appels d’offres — parcours modulaire pour AMO et MOA en présentiel IDF.',
    apprentissageCards: [
      {
        icon: Briefcase,
        titre: 'Piloter la mission AMO',
        texte: 'Synthèses, tableaux de suivi et échanges MOA assistés par l’IA.',
      },
      {
        icon: FileText,
        titre: 'Structurer les consultations',
        texte: 'Lire un DCE et préparer une réponse cohérente.',
      },
      {
        icon: Coins,
        titre: 'Tarifs transparents',
        texte: 'Trois modules de 4 h — parcours complet 460 € HT / participant (inter).',
      },
    ],
    pedagogyCards: [
      {
        icon: HardHat,
        titre: 'Cas AMO / MOA',
        texte: 'Pièces pédagogiques inspirées de missions réelles.',
      },
      {
        icon: FileText,
        titre: 'DCE et synthèses',
        texte: 'Méthodes de lecture et de reformulation contrôlée.',
      },
      {
        icon: Layers,
        titre: 'Trames réutilisables',
        texte: 'Modèles à adapter à vos missions.',
      },
      {
        icon: Shield,
        titre: 'Engagements MOA',
        texte: 'Aucune promesse contractuelle sans validation humaine.',
      },
    ],
    modulesSectionId: 'amo-btp-parcours-modules',
    ctaAnalyticsPrefix: 'parcours-amo-btp',
  },
};

export function getParcoursMetierTemplateContent(id: ParcoursId): ParcoursMetierTemplateContent | undefined {
  return PARCOURS_METIER_TEMPLATE_BY_ID[id];
}
