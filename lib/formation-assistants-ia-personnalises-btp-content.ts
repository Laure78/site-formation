/**
 * Contenu centralisé — fiche catalogue NIV-09 assistants IA personnalisés BTP.
 * Source programme : programme_OFC_Assistants_IA_BTP_7h_20261022.pdf
 */
import { getFormationByCode, libelleEffectifFormation } from '@/data/formations';

const NIV_09 = getFormationByCode('NIV-09')!;
const EFFECTIF_NIV09 = libelleEffectifFormation(NIV_09);

export const ASSISTANTS_IA_PROPOSITION_VALEUR =
  'Créez vos propres assistants IA pour les tâches quotidiennes de votre entreprise du BTP. Apprenez à utiliser ChatGPT et Claude pour concevoir des assistants adaptés à vos devis, comptes rendus de chantier, courriers, appels d\'offres et documents administratifs. Travaillez sur vos propres modèles et repartez avec des outils réutilisables dans votre entreprise.' as const;

export const ASSISTANTS_IA_HERO_FACTS = [
  '7 heures — 1 journée',
  'Présentiel',
  'Inter : Guyancourt (78)',
  `Jusqu'à ${NIV_09.effectifMax} participants`,
  '70 % de pratique',
  'ChatGPT Plus et Claude Pro (ou comptes entreprise) requis',
] as const;

export const ASSISTANTS_IA_OUTILS = 'ChatGPT · Claude' as const;

export const ASSISTANTS_IA_CREATIONS = [
  {
    title: '4 assistants IA métier',
    text: 'Assistants opérationnels adaptés à vos documents et à la charte de votre entreprise.',
  },
  {
    title: 'Bibliothèque de skills BTP',
    text: 'Skills prêts à téléverser dans ChatGPT ou Claude, personnalisables selon vos modèles.',
  },
  {
    title: 'Modèles réutilisables',
    text: 'Devis, CR, courriers et trames alimentés dans vos projets et assistants.',
  },
  {
    title: 'Plan d\'action individuel',
    text: 'Priorités de déploiement sur 30 jours et règles de partage en équipe.',
  },
  {
    title: 'Accès plateforme 1 an',
    text: 'Supports, tutoriels, base de prompts et bibliothèque de skills après la session.',
  },
] as const;

export const ASSISTANTS_IA_OBJECTIFS = [
  'Utiliser les fonctionnalités clés de ChatGPT et de Claude (projets, skills, connecteurs) et choisir le bon outil selon la tâche.',
  'Appliquer les bonnes pratiques de confidentialité et vérifier les réponses de l\'IA avant tout envoi.',
  'Créer un assistant IA personnalisé adapté à son métier et à son entreprise, sur ChatGPT ou Claude.',
  'Créer, téléverser et partager un skill pour automatiser une tâche récurrente.',
  'Alimenter son assistant avec ses propres modèles : courriers types, trames de devis, conditions générales, comptes rendus.',
  'Déployer ses assistants dans l\'équipe et construire son plan d\'action personnel.',
  'Appliquer son assistant à une tâche réelle du quotidien et mesurer le gain de temps.',
] as const;

export const ASSISTANTS_IA_JOURNEE_TIMELINE = [
  '9h00 — 10h45 · Module 1 — Fonctionnalités clés de ChatGPT et Claude (1h45)',
  '10h45 — 11h00 · Pause (15 min)',
  '11h00 — 12h30 · Module 2 — Créer des assistants chantier (1h30)',
  '12h30 — 13h30 · Déjeuner',
  '13h30 — 16h30 · Module 3 — Ateliers pratiques (3h00, pause 15 min incluse)',
  '16h30 — 17h00 · Module 4 — Déployer ses assistants et plan d\'action (30 min)',
] as const;

export const ASSISTANTS_IA_MODULES = [
  {
    heading: 'Module 1 — Les fonctionnalités clés de ChatGPT et de Claude',
    duree: '1h45 · 9h00 – 10h45',
    points: [
      'ChatGPT : projets, skills (/), connecteurs (messagerie, agenda, dossiers).',
      'Claude : projets et base de connaissances, skills et connecteurs.',
      'Prise en main : créer un projet, y déposer un modèle d\'entreprise, tester sur les deux outils.',
      'Activer un connecteur et retrouver une information en une question.',
      'Démonstration : création d\'un skill (relance, CR d\'intervention), import/export et partage.',
      'Règle d\'or : un skill = une mission précise.',
    ],
    atelier: 'Livrable : panorama pratique des fonctionnalités, illustré par la création d\'un skill en démonstration.',
  },
  {
    heading: 'Module 2 — Créer des assistants chantier',
    duree: '1h30 · 11h00 – 12h30',
    points: [
      'Rôle, ton et contraintes de l\'assistant (vocabulaire métier, usages entreprise).',
      'Documents de référence : devis types, trames de CR, fiches.',
      'Charte graphique : logo, couleurs et mise en page appliqués aux documents produits.',
      'Méthode en trois passes : tester, corriger, verrouiller.',
      'Construction pas à pas du premier assistant sur l\'atelier prioritaire du groupe.',
    ],
    atelier: 'Livrable : un premier assistant chantier opérationnel, construit sur les documents de l\'entreprise.',
  },
  {
    heading: 'Module 3 — Ateliers pratiques',
    duree: '3h00 · 13h30 – 16h30 (pause 15 min incluse)',
    points: [
      'Quatre ateliers retenus pour le groupe parmi les six proposés, selon le questionnaire de recueil des attentes.',
      'Chaque atelier : instructions à partir de vos modèles, test sur document réel, adaptation des skills fournis.',
      'Objectif : 4 assistants opérationnels à partir de la bibliothèque de skills BTP.',
    ],
    atelier: 'Voir la section « Six assistants métier possibles » — tous ne sont pas réalisés le même jour.',
  },
  {
    heading: 'Module 4 — Déployer ses assistants et plan d\'action',
    duree: '30 min · 16h30 – 17h00',
    points: [
      'Partage à l\'équipe : droits, mises à jour, référent par assistant.',
      'Confidentialité et vérification humaine avant tout envoi.',
      'Plan d\'action : les assistants ou skills à déployer dans les 30 jours.',
    ],
    atelier: 'Livrable : plan d\'action individuel et règles de déploiement dans l\'entreprise.',
  },
] as const;

export type AssistantsIaAtelier = {
  id: string;
  title: string;
  description: string;
  usages: readonly string[];
  skills: readonly string[];
};

export const ASSISTANTS_IA_ATELIERS: readonly AssistantsIaAtelier[] = [
  {
    id: 'devis',
    title: 'Devis et chiffrage',
    description:
      'Rédiger et contrôler vos devis à partir de vos modèles et notes de visite.',
    usages: [
      'Devis détaillé à partir de notes de visite',
      'Contrôle avant envoi (postes, unités, mentions)',
    ],
    skills: ['Descriptif de devis', 'Contrôle de devis', 'Relance de devis', 'Avenant / travaux supplémentaires'],
  },
  {
    id: 'cr-chantier',
    title: 'Comptes rendus de chantier',
    description: 'Structurer vos CR et le suivi des actions et réserves.',
    usages: [
      'Notes en vrac ou message vocal → CR structuré',
      'Actions qui / quoi / quand, reprise des points non soldés',
    ],
    skills: ['CR de chantier', 'CR d\'intervention', 'Suivi des réserves', 'Ordre du jour de réunion'],
  },
  {
    id: 'emails',
    title: 'E-mails et courriers',
    description: 'Réponses et relances au ton de votre entreprise.',
    usages: [
      'Réponse client, relance paiement, réclamation',
      'Courrier sous-traitant avec formules validées',
    ],
    skills: ['Relance impayé', 'Réponse à réclamation', 'Courrier sous-traitant', 'Réponse à demande client'],
  },
  {
    id: 'ao',
    title: 'Appels d\'offres',
    description: 'Analyser le DCE et préparer la décision go / no go.',
    usages: [
      'Synthèse RC, CCTP, CCAP et critères de notation',
      'Points de vigilance et préparation du mémoire technique',
    ],
    skills: ['Analyse RC', 'Analyse CCTP', 'Go / No go', 'Mémoire technique'],
  },
  {
    id: 'admin-chantier',
    title: 'Administratif de chantier',
    description: 'Préparer les documents obligatoires sans repartir de zéro.',
    usages: [
      'Trames PPSPS, PIC, DOE, fiches qualité',
      'Planning de chantier et mises à jour',
    ],
    skills: ['PPSPS', 'PIC', 'DOE', 'Planning'],
  },
  {
    id: 'communication',
    title: 'Communication',
    description: 'Valoriser vos chantiers et votre présence en ligne.',
    usages: [
      'Posts réseaux sociaux à partir de photos de chantier',
      'Article web optimisé SEO, newsletter',
    ],
    skills: ['Post réseaux sociaux', 'Article SEO', 'Newsletter', 'Fiche référence chantier'],
  },
] as const;

export const ASSISTANTS_IA_ATELIERS_NOTE =
  'Quatre ateliers sont sélectionnés parmi ces six, selon les besoins du groupe (questionnaire envoyé avant la session). Les six ne sont pas réalisés durant la même journée.' as const;

export const ASSISTANTS_IA_LIVRABLES = [
  '4 assistants IA métier opérationnels, adaptés à vos documents.',
  'Bibliothèque de skills BTP personnalisables (ChatGPT / Claude).',
  'Premier assistant chantier testé sur un document réel.',
  'Plan d\'action individuel sur 30 jours.',
  'Accès individuel à la plateforme de formation pendant 1 an.',
  'Attestation individuelle de fin de formation.',
] as const;

export const ASSISTANTS_IA_PEDAGOGIE = [
  'Avant la session : questionnaire de recueil des attentes pour adapter les ateliers.',
  'Pendant : apports courts, démonstrations en direct, ateliers sur vos cas réels.',
  'Après : accès plateforme 1 an (supports, prompts, tutoriels, skills BTP).',
  'Positionnement initial et validation des acquis sur les livrables produits.',
  'Questionnaire de satisfaction à chaud.',
  'Émargement et attestation individuelle.',
] as const;

export const ASSISTANTS_IA_PUBLIC_ITEMS = [
  'Professionnels du BTP : dirigeants et chefs d\'entreprise (tous corps d\'état)',
  'Conducteurs de travaux, chefs d\'équipe, chargés d\'affaires',
  'Assistant(e)s administratifs et travaux, conjoints collaborateurs',
  'Fonctions support du bâtiment',
] as const;

export const ASSISTANTS_IA_PREREQUIS_ITEMS = [
  'Savoir utiliser un ordinateur et naviguer sur internet',
  'Utilisation courante de l\'IA (ChatGPT ou Claude)',
  'Ordinateur portable',
  'Abonnements ChatGPT Plus et Claude Pro, ou comptes entreprise (Team) compatibles — actifs avant la session (non inclus dans le tarif)',
] as const;

export const ASSISTANTS_IA_MODALITES = [
  'Présentiel — Inter : Guyancourt (78) · Intra : locaux de l\'entreprise en Île-de-France',
  `Effectif : ${EFFECTIF_NIV09}`,
  'Horaires : 9h00 — 12h30 / 13h30 — 17h00 (pauses selon programme)',
  'Inscription via laureolivie.fr/contact jusqu\'à 7 jours avant la session, sous réserve de places',
  'Prise en charge possible par l\'OPCO compétent, notamment Constructys, selon les conditions d\'éligibilité applicables',
] as const;
