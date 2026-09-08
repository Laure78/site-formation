/**
 * Contenu centralisé — fiche catalogue NIV-09 assistants IA personnalisés BTP.
 */
import { LINKS } from '@/lib/internal-links';

export const ASSISTANTS_IA_HERO_FACTS = [
  '4 heures en présentiel',
  'Île-de-France uniquement',
  'Formation collective en intra ou interentreprises',
  '6 à 12 participants',
  '80 % de pratique',
  'Bases de l’IA requises',
] as const;

export const ASSISTANTS_IA_OUTILS = 'ChatGPT · Gemini · Claude' as const;

export const ASSISTANTS_IA_BENEFICES = [
  {
    title: 'Réutiliser ses consignes',
    text: 'Gardez vos instructions utiles sans les réécrire à chaque échange.',
  },
  {
    title: 'Harmoniser les documents',
    text: 'Alignez le ton et la structure des documents produits par l’équipe.',
  },
  {
    title: 'Centraliser modèles et ressources',
    text: 'Rassemblez modèles, documents et bonnes pratiques au même endroit.',
  },
  {
    title: 'Tester et améliorer',
    text: 'Affinez les réponses de vos assistants par des essais successifs.',
  },
] as const;

export const ASSISTANTS_IA_OBJECTIFS = [
  'Configurer des assistants adaptés à leur poste.',
  'Comparer les possibilités de ChatGPT, Gemini et Claude.',
  'Organiser une base de connaissances et une bibliothèque de prompts.',
  'Tester les réponses et améliorer les instructions.',
  'Préparer un assistant transverse pour les besoins de l’équipe.',
] as const;

export const ASSISTANTS_IA_MODULES = [
  {
    heading: 'Module 1 — Créer ses assistants IA métier',
    duree: '2 heures',
    points: [
      'Comprendre les différences entre GPTs, Gems et projets Claude.',
      'Choisir un cas d’usage lié à son poste.',
      'Définir le rôle, les consignes, le ton et les limites.',
      'Ajouter des connaissances et des modèles utiles.',
      'Affiner les réponses par des échanges successifs.',
      'Enchaîner plusieurs consignes pour une tâche complexe.',
    ],
    atelier: 'Créer un assistant personnalisé et tester ses réponses sur un cas métier.',
  },
  {
    heading: 'Module 2 — Préparer un assistant d’équipe et organiser ses ressources',
    duree: '2 heures',
    points: [
      'Identifier les tâches répétitives communes.',
      'Configurer un assistant transverse.',
      'Préparer son utilisation par les collaborateurs selon les possibilités de partage.',
      'Classer les prompts validés par thème.',
      'Intégrer des documents métier : RC, CCTP, fiches techniques et modèles internes.',
      'Finaliser un kit réutilisable après la formation.',
    ],
    atelier: 'Créer un assistant transverse et organiser sa bibliothèque de prompts.',
  },
] as const;

export const ASSISTANTS_IA_EXEMPLES = [
  'Compte rendu de chantier : synthèse, actions et responsables.',
  'Analyse de DCE : extraction des exigences et points à vérifier.',
  'Mémoire technique : structuration à partir des informations de l’entreprise.',
  'Assistant administratif : courriers et relances.',
  'Assistant commercial : propositions et suivi des devis.',
  'Planification de chantier : préparation des étapes et des jalons.',
] as const;

export const ASSISTANTS_IA_LIVRABLES = [
  'Au moins deux assistants personnalisés adaptés au poste.',
  'Un assistant transverse, partageable selon l’outil et l’abonnement.',
  'Une bibliothèque de prompts organisée par thème.',
  'Les supports et ressources pédagogiques accessibles depuis l’espace de formation.',
  'Une attestation individuelle de formation.',
] as const;

export const ASSISTANTS_IA_PEDAGOGIE = [
  '80 % de pratique et 20 % de théorie.',
  'Cas réels du BTP.',
  'Exercices individuels et en binôme au sein du groupe.',
  'Démonstrations et corrections en direct.',
  'Positionnement initial.',
  'Évaluation pendant les exercices.',
  'QCM de fin de formation.',
  'Questionnaire de satisfaction.',
] as const;

export const ASSISTANTS_IA_MODALITES = [
  'Présentiel uniquement en Île-de-France.',
  'En entreprise ou dans une salle adaptée.',
  'Intra ou interentreprises.',
  'Groupe de 6 à 12 participants.',
  'Dates à définir.',
  'Inscription jusqu’à 7 jours avant la session, selon les disponibilités.',
] as const;

/** URL contact devis avec présélection de la formation. */
export function assistantsIaDevisHref(formationTitle: string): string {
  return `${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}`;
}
