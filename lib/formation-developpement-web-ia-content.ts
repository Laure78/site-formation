/**
 * Contenu — formation « Développement web avec l’IA — sans savoir coder » (NIV-10).
 * Parcours 7 h / 14 h — alignés `lib/bework-programmes.ts`.
 */
import { LINKS } from '@/lib/internal-links';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { BEWORK_MODULES_JOUR2, BEWORK_PARCOURS } from '@/lib/bework-programmes';
import { formatTarifHt } from '@/lib/tarifs-sessions';

export const DEV_WEB_IA_PATH = LINKS.formationDeveloppementWebIaSansCoder;
export const DEV_WEB_IA_CODE = 'NIV-10' as const;

/** Tarifs inter — source unique (alignés BeWork / OFC). */
export const TARIF_INTER_DEV_WEB_IA_HT = BEWORK_PARCOURS['7h'].tarifHt;
export const TARIF_INTER_DEV_WEB_IA_14H_HT = BEWORK_PARCOURS['14h'].tarifHt;

export const DEV_WEB_IA_PARCOURS_7H = BEWORK_PARCOURS['7h'];
export const DEV_WEB_IA_PARCOURS_14H = BEWORK_PARCOURS['14h'];

export const DEV_WEB_IA_PDF_7H_HREF = LINKS.pdfProgrammeDeveloppementWebIaSansCoder;
export const DEV_WEB_IA_PDF_14H_HREF = LINKS.pdfProgrammeDeveloppementWebIaSansCoder14h;

/** Libellés commerciaux — pas de prix barré ni de date de fin fictive. */
export const DEV_WEB_IA_BADGE_NOUVELLE = 'Nouvelle formation' as const;
export const DEV_WEB_IA_BADGE_NOUVEAU = 'Nouveau' as const;
export const DEV_WEB_IA_PRIX_LANCEMENT_LABEL = 'Prix de lancement' as const;

export const DEV_WEB_IA_SUBTITLE =
  'Créer un site, une application ou un outil métier avec l’intelligence artificielle.' as const;

export const DEV_WEB_IA_HOOK = {
  line1: 'Une idée.',
  line2: 'Une journée.',
  line3: 'Une première version fonctionnelle.',
} as const;

export const DEV_WEB_IA_HERO_FACTS = [
  '7 h (1 journée) ou 14 h (2 journées)',
  '9h00 – 12h30 · 13h30 – 17h00',
  '6 à 8 participants',
  '70 % pratique · 30 % méthodologie',
] as const;

/** Ligne durée courte (hero / cartes). */
export const DEV_WEB_IA_DUREE_COURTE = '7 h ou 14 h' as const;

export const DEV_WEB_IA_INCLUS_TARIF = [
  'l’animation de la formation',
  'les supports pédagogiques',
  'l’accès aux ressources prévues',
  'les exercices pratiques',
  'les évaluations prévues dans le programme',
] as const;

export const DEV_WEB_IA_FORMATS = [
  'Présentiel · Île-de-France',
  'Inter-entreprises (sessions programmées)',
  'Intra-entreprise sur devis',
] as const;

export const DEV_WEB_IA_PUBLIC = [
  'Entrepreneurs',
  'Indépendants',
  'TPE et PME du bâtiment',
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

/** Programme Jour 2 — parcours 14 h uniquement. */
export const DEV_WEB_IA_MODULES_JOUR2: readonly DevWebIaModule[] = BEWORK_MODULES_JOUR2.modules.map(
  (m) => ({
    number: m.number,
    title: m.title,
    points: m.sequences.flatMap((s) => s.points),
  }),
);

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

export const DEV_WEB_IA_LIVRABLES_14H = [
  ...DEV_WEB_IA_LIVRABLES,
  'un projet enrichi et testé en profondeur',
  'une version publiée en ligne (selon avancement du participant)',
  'des bases de référencement et de contrôle post-publication',
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
    a: 'Présentiel uniquement, en Île-de-France : inter-entreprises ou intra-entreprise sur devis. Groupe de 6 à 8 participants.',
  },
  {
    q: 'Quelle durée choisir — 7 h ou 14 h ?',
    a: `Le parcours <strong>7 h</strong> (1 journée) couvre le Jour 1 : cadrage, première version, tests et feuille de route — ${formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT)} € HT / participant. Le parcours <strong>14 h</strong> (2 journées) reprend le Jour 1 puis approfondit : améliorer le projet, publier en ligne et bases de référencement — ${formatTarifHt(TARIF_INTER_DEV_WEB_IA_14H_HT)} € HT / participant. Vous pouvez commencer en 7 h et prolonger en 14 h selon les dates ouvertes.`,
  },
  {
    q: 'Quel est le tarif de la formation ?',
    a: `Inter-entreprises : ${formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT)} € HT / participant (7 h) · ${formatTarifHt(TARIF_INTER_DEV_WEB_IA_14H_HT)} € HT / participant (14 h). Intra-entreprise : sur devis. Prise en charge par un OPCO possible selon l’éligibilité, les plafonds applicables et l’accord de financement.`,
  },
] as const;

/** Libellé tarif catalogue / résumés — cohérent partout. */
export function libelleTarifLancementDevWebIa(): string {
  return `${DEV_WEB_IA_PRIX_LANCEMENT_LABEL} : ${formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT)} € HT / participant (7 h) · ${formatTarifHt(TARIF_INTER_DEV_WEB_IA_14H_HT)} € HT / participant (14 h)`;
}

export function mentionFinancementDevWebIa(): string {
  return FINANCEMENT_FORMULATION_PRUDENTE;
}

export function devWebIaDevisHref(formationTitle: string): string {
  return `${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}`;
}

export function devWebIaInscriptionHref(): string {
  return `${LINKS.contact}?objet=inscription&formation=${encodeURIComponent('Développement web avec l’IA — sans savoir coder')}`;
}
