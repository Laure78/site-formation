/**
 * Contenu — formation « Développement web avec l’IA — sans savoir coder » (NIV-10).
 * Source programme 7 h — Laure Olivié / OFC Création d’Entreprise.
 */
import { LINKS } from '@/lib/internal-links';

export const DEV_WEB_IA_PATH = LINKS.formationDeveloppementWebIaSansCoder;
export const DEV_WEB_IA_CODE = 'NIV-10' as const;

/** Tarif interentreprises — source programme. */
export const TARIF_INTER_DEV_WEB_IA_HT = 300;

export const DEV_WEB_IA_SUBTITLE =
  'Créer un site, une application ou un outil métier avec l’intelligence artificielle' as const;

export const DEV_WEB_IA_HOOK = {
  line1: 'Une idée.',
  line2: 'Une journée.',
  line3: 'Une première version fonctionnelle.',
} as const;

export const DEV_WEB_IA_HERO_FACTS = [
  '7 heures — 1 journée',
  '9h00 – 12h30 · 13h30 – 17h00',
  '6 à 8 participants',
  '70 % pratique · 30 % méthodologie',
] as const;

export const DEV_WEB_IA_FORMATS = [
  'Présentiel',
  'Classe virtuelle',
  'Intra-entreprise sur demande',
] as const;

export const DEV_WEB_IA_PUBLIC = [
  'Entrepreneurs',
  'Indépendants',
  'Artisans',
  'Commerçants',
  'Salariés',
  'Porteurs de projet',
  'Personnes en reconversion',
] as const;

export const DEV_WEB_IA_PREREQUIS = [
  'Savoir utiliser un ordinateur',
  'Savoir naviguer sur Internet',
  'Disposer d’une adresse email',
  'Pouvoir installer des applications sur son ordinateur',
  'Disposer d’un abonnement actif à ChatGPT ou Claude AI',
  'Avoir vérifié ses accès avant la formation',
] as const;

export const DEV_WEB_IA_OBJECTIFS = [
  'Cadrer un projet numérique à partir d’une idée ou d’un besoin',
  'Identifier les utilisateurs et les fonctionnalités principales',
  'Structurer le périmètre fonctionnel d’une première version',
  'Utiliser une méthode de prompting structurée',
  'Décomposer son projet en étapes',
  'Comprendre le rôle des différents outils utilisés',
  'Créer une première version fonctionnelle sans écrire directement de code',
  'Modifier une production avec l’aide de l’IA',
  'Tester une fonctionnalité',
  'Identifier un problème',
  'Demander une correction à l’IA',
  'Sauvegarder son projet',
  'Définir une feuille de route pour poursuivre après la formation',
] as const;

export type DevWebIaModule = {
  number: number;
  title: string;
  points: readonly string[];
};

export const DEV_WEB_IA_MODULES: readonly DevWebIaModule[] = [
  {
    number: 1,
    title: 'Cadrer et préparer son projet',
    points: [
      'Cadrer son idée',
      'Identifier les utilisateurs',
      'Clarifier le besoin',
      'Définir les fonctionnalités principales',
      'Installer et prendre en main les outils',
      'Comprendre le rôle de l’IA, de l’environnement de développement et de l’hébergement',
    ],
  },
  {
    number: 2,
    title: 'Structurer son projet et guider efficacement l’IA',
    points: [
      'Décomposer le projet en étapes',
      'Organiser le projet en écrans, fonctions et parcours utilisateur',
      'Identifier les données nécessaires',
      'Hiérarchiser les fonctionnalités',
      'Distinguer la première version des évolutions futures',
      'Rédiger des instructions structurées : rôle + contexte + objectif + contraintes + résultat attendu',
    ],
  },
  {
    number: 3,
    title: 'Construire une première version',
    points: [
      'Structurer l’architecture du projet',
      'Définir l’ordre de construction',
      'Créer une première version avec l’IA',
      'Vérifier le résultat',
      'Faire les premières modifications',
      'Créer une navigation simple',
      'Créer des formulaires',
      'Enregistrer et afficher des données lorsque le projet le nécessite',
    ],
  },
  {
    number: 4,
    title: 'Tester, corriger et poursuivre son projet',
    points: [
      'Construire un scénario de test',
      'Tester les fonctionnalités principales',
      'Identifier les écarts',
      'Décrire précisément un problème',
      'Demander une correction à l’IA',
      'Vérifier la correction',
      'Améliorer l’apparence et la lisibilité',
      'Sauvegarder régulièrement le projet',
      'Conserver différentes versions',
      'Prendre en compte les données personnelles et informations sensibles',
      'Construire une feuille de route pour la suite',
    ],
  },
];

export const DEV_WEB_IA_LIVRABLES = [
  'votre projet cadré',
  'votre périmètre fonctionnel défini',
  'une première architecture',
  'une première version construite',
  'une méthode pour travailler avec l’IA',
  'une méthode de test et de correction',
  'votre projet sauvegardé',
  'une feuille de route pour continuer',
] as const;

export const DEV_WEB_IA_PEDAGOGIE = [
  'Chaque participant travaille sur son propre projet',
  'Démonstrations',
  'Ateliers guidés',
  'Travail individuel',
  'Tests et corrections',
  'Échanges avec le formateur',
  'Cas pratique fil rouge pendant toute la journée',
] as const;

export const DEV_WEB_IA_ESPACE = [
  'Supports de formation',
  'Fiches méthodologiques',
  'Ressources complémentaires',
  'Supports liés au prompting',
] as const;

export const DEV_WEB_IA_EVALUATION = [
  'Avant : questionnaire d’analyse du besoin et de positionnement',
  'Pendant : évaluation à travers le projet réalisé par le participant',
  'En fin : présentation de la production, évaluation des acquis, questionnaire de satisfaction',
  'Suivi : enquête à froid à 3 mois',
] as const;

export const DEV_WEB_IA_FAQ = [
  {
    q: 'Faut-il savoir coder pour suivre cette formation ?',
    a: 'Non. Aucun prérequis en programmation ou en création de site n’est nécessaire. Vous créez avec l’aide de l’IA, sans écrire le code vous-même.',
  },
  {
    q: 'Est-ce que je reparte avec un logiciel prêt pour la production ?',
    a: 'Non. L’objectif est une première version fonctionnelle, cadré, testée et sauvegardée — pas un produit complet en production. Vous repartez aussi avec une méthode et une feuille de route pour poursuivre.',
  },
  {
    q: 'L’abonnement ChatGPT ou Claude est-il inclus ?',
    a: 'Non. L’abonnement actif à ChatGPT ou Claude AI est à votre charge et n’est pas compris dans le prix de la formation. Vérifiez vos accès avant la session.',
  },
  {
    q: 'Quels formats sont proposés ?',
    a: 'Présentiel, classe virtuelle, ou intra-entreprise sur demande. Groupe de 6 à 8 participants.',
  },
  {
    q: 'Comment est tarifée la formation ?',
    a: 'Inter-entreprises : 300 € HT par participant. Intra-entreprise : sur devis. Prise en charge par un OPCO possible selon l’éligibilité de l’entreprise et du dossier.',
  },
] as const;

export function devWebIaDevisHref(formationTitle: string): string {
  return `${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}`;
}

export function devWebIaInscriptionHref(): string {
  return `${LINKS.contact}?objet=inscription&formation=${encodeURIComponent('Développement web avec l’IA — sans savoir coder')}`;
}
