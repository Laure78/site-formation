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

/** Compétences visées — sans recopier les activités du programme (4 modules). */
export const DEV_WEB_IA_OBJECTIFS = [
  'Analyser un besoin et fixer un périmètre réaliste pour une première version',
  'Organiser un projet (parcours utilisateur, écrans, priorités fonctionnelles)',
  'Formuler des consignes exploitables par l’IA, étape par étape',
  'Mobiliser les bons outils selon la tâche (assistant, environnement de création)',
  'Obtenir une première version testable sans écrire le code soi-même',
  'Appliquer une démarche de test, correction et sauvegarde sur son projet',
  'Planifier la suite du projet après la session de formation',
] as const;

export type DevWebIaModule = {
  number: number;
  title: string;
  points: readonly string[];
};

export type DevWebIaProgrammeModule = {
  number: number;
  title: string;
  objective: string;
  activities: readonly string[];
  result: string;
};

export const DEV_WEB_IA_MODULES: readonly DevWebIaProgrammeModule[] = [
  {
    number: 1,
    title: 'Cadrer et préparer son projet',
    objective:
      'Clarifier le besoin, poser le périmètre de la première version et disposer d’un environnement prêt à l’emploi.',
    activities: [
      'Identifier les utilisateurs, le besoin métier et les fonctions prioritaires pour une V1',
      'Définir le périmètre de la première version et ce qui pourra attendre',
      'Préparer l’environnement : outils installés, comptes et accès vérifiés avant de produire',
      'Repérer quel outil mobiliser selon la tâche (assistant IA, création, hébergement)',
    ],
    result:
      'Un projet cadré, un périmètre de V1 acté et un poste prêt pour commencer à construire.',
  },
  {
    number: 2,
    title: 'Structurer son projet et guider efficacement l’IA',
    objective:
      'Organiser parcours, écrans et données, puis guider l’IA avec des consignes précises à chaque étape.',
    activities: [
      'Esquisser le parcours utilisateur et les écrans ou vues principales',
      'Hiérarchiser les fonctionnalités et les données nécessaires à la V1',
      'Découper le travail en étapes avec des demandes ciblées à l’IA',
      'Rédiger et ajuster des instructions structurées (contexte, objectif, contraintes, résultat attendu)',
    ],
    result: 'Un périmètre fonctionnel clair et une méthode pour dialoguer efficacement avec l’IA.',
  },
  {
    number: 3,
    title: 'Construire une première version',
    objective:
      'Passer du cadrage à une première version manipulable, avec navigation et fonctions de base reliées.',
    activities: [
      'Structurer l’architecture du projet et l’ordre de construction des blocs',
      'Générer une première version avec l’IA à partir du besoin structuré',
      'Mettre en place navigation, formulaires simples et affichage des données utiles',
      'Appliquer les premières corrections constatées sur votre projet',
    ],
    result:
      'Une première version testable, avec ses premières connexions — pas un logiciel achevé ni prêt pour la production.',
  },
  {
    number: 4,
    title: 'Tester, corriger et poursuivre son projet',
    objective:
      'Vérifier le résultat, corriger les écarts avec l’IA et préparer la suite en dehors de la session.',
    activities: [
      'Construire un scénario de test sur les fonctions principales',
      'Identifier les problèmes et formuler une demande de correction précise',
      'Améliorer lisibilité et cohérence sans viser un logiciel « clé en main »',
      'Sauvegarder le projet, respecter les précautions sur les données et rédiger une feuille de route',
    ],
    result:
      'Une méthode de test et de correction, un projet sauvegardé et un plan pour continuer après la formation.',
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
  'Environnement de travail vérifié',
  'Projet cadré et périmètre de la première version',
  'Première version testable (non prête pour la production)',
  'Méthode pour guider, tester et corriger avec l’IA',
  'Projet sauvegardé et feuille de route personnelle',
  'Certificat de réalisation',
] as const;

export const DEV_WEB_IA_LIVRABLES_14H = [
  ...DEV_WEB_IA_LIVRABLES,
  'un projet enrichi et testé en profondeur',
  'une version publiée en ligne (selon avancement du participant)',
  'des bases de référencement et de contrôle post-publication',
] as const;

export const DEV_WEB_IA_PEDAGOGIE = [
  'Fil rouge sur le projet de chaque participant — pas sur un cas générique',
  'Courtes démonstrations, ateliers guidés puis travail individuel sur poste',
  'Tests et corrections en direct, avec échanges avec la formatrice',
  'Petit groupe (6 à 8 participants) pour des allers-retours réguliers',
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
    q: 'Faut-il savoir coder ? La formation convient-elle aux débutants ?',
    a: 'Non. Aucun prérequis en programmation ou en création de site n’est nécessaire. Ce n’est pas un cursus de développement : vous apprenez à cadrer votre besoin, guider l’IA, tester le résultat et corriger — sans prétendre devenir développeur en une journée.',
  },
  {
    q: 'Est-ce que je repars avec un logiciel prêt pour la production ?',
    a: 'Non. En 7 h, l’objectif est une première version testable, cadrée et sauvegardée — pas un produit complet prêt pour la production. Vous repartez aussi avec une méthode et une feuille de route pour continuer.',
  },
  {
    q: 'Dois-je venir avec une idée de projet ?',
    a: 'Oui, idéalement : même une idée floue permet de structurer un besoin et d’avancer concrètement sur votre cas. Si vous hésitez encore, nous pouvons partir d’un scénario pédagogique pour pratiquer la méthode.',
  },
  {
    q: 'Dois-je apporter mon ordinateur ?',
    a: 'Oui. La session est pratique : vous travaillez sur votre propre poste. Prévoyez aussi un abonnement actif à ChatGPT ou Claude AI (non inclus dans le tarif) et vérifiez vos accès avant le jour J.',
  },
  {
    q: 'Que peut-on raisonnablement créer en 7 h ?',
    a: 'Une première version testable selon votre idée : site vitrine simple, petit outil métier, prototype (agenda, suivi clients, tableau de bord, messagerie interne, etc.). Le détail des activités est dans le programme en 4 modules ; la promesse reste une V1 à tester, pas un logiciel achevé.',
  },
  {
    q: 'Quels formats sont proposés ? Puis-je suivre la formation en visio ?',
    a: 'Le présentiel en Île-de-France est privilégié (inter-entreprises ou intra-entreprise sur devis, 6 à 8 participants). Des sessions inter-entreprises en visioconférence sont aussi ouvertes à des dates dédiées, avec le même parcours de 7 h et des échanges adaptés au partage d’écran.',
  },
  {
    q: 'L’abonnement ChatGPT ou Claude est-il inclus ?',
    a: 'Non. L’abonnement à ChatGPT ou Claude AI reste à votre charge et n’est pas compris dans le prix de la formation. Vérifiez vos accès avant la session.',
  },
] as const;

/** Libellé tarif catalogue / résumés — cohérent partout. */
export function libelleTarifLancementDevWebIa(): string {
  return `${DEV_WEB_IA_PRIX_LANCEMENT_LABEL} : ${formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT)} € HT / participant (7 h) · ${formatTarifHt(TARIF_INTER_DEV_WEB_IA_14H_HT)} € HT / participant (14 h)`;
}

export function mentionFinancementDevWebIa(): string {
  return FINANCEMENT_FORMULATION_PRUDENTE;
}

/** Ancre du formulaire projet sur la fiche NIV-10. */
export const DEV_WEB_IA_PROJECT_FORM_ID = 'parlez-projet' as const;

export const DEV_WEB_IA_CONTACT_SUBJECT =
  'Demande d’information — Développement web avec l’IA — sans savoir coder' as const;

export const DEV_WEB_IA_FORMATION_REFERENCE = 'NIV-10' as const;

export function devWebIaProjectFormHref(): string {
  return `${DEV_WEB_IA_PATH}#${DEV_WEB_IA_PROJECT_FORM_ID}`;
}

/** Devis / session intra / renseignements — formulaire dédié sur la fiche formation. */
export function devWebIaDevisHref(_formationTitle?: string): string {
  return devWebIaProjectFormHref();
}

export function devWebIaInscriptionHref(): string {
  return `${LINKS.contact}?objet=inscription&formation=${encodeURIComponent('Développement web avec l’IA — sans savoir coder')}`;
}
