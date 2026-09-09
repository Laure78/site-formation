/**
 * Contenu centralisé — fiche catalogue NIV-09 assistants IA personnalisés BTP.
 */
import { LINKS } from '@/lib/internal-links';

export const ASSISTANTS_IA_HERO_FACTS = [
  '7 heures en présentiel (1 journée)',
  'Île-de-France uniquement',
  'Formation collective en intra-entreprise',
  '6 à 10 participants',
  '80 % de pratique',
  'Abonnement ChatGPT Plus ou Claude Pro requis',
] as const;

export const ASSISTANTS_IA_OUTILS = 'ChatGPT · Claude' as const;

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
  'Créer des assistants IA personnalisés adaptés à leur poste et des assistants transverses pour l’équipe.',
  'Configurer un assistant sur ChatGPT et Claude en comprenant leurs différences.',
  'Structurer une base de connaissances : prompts validés, modèles et bonnes pratiques métier.',
  'Évaluer la pertinence d’un assistant et itérer pour fiabiliser les résultats.',
  'Appliquer les règles de confidentialité, de vérification et de traçabilité dans l’usage quotidien.',
] as const;

export const ASSISTANTS_IA_MODULES = [
  {
    heading: 'Module 1 — Littératie IA & cadre AI Act',
    duree: '1 h 15',
    points: [
      'Comprendre l’IA générative : ChatGPT, Claude, forces, limites et hallucinations.',
      'Confidentialité et données : ce que l’on peut confier, ce que l’on protège.',
      'Tokens, probabilités et fenêtre de contexte — implications pour la vérification.',
      'Cadre AI Act et littératie IA : former, tracer, supervision humaine.',
    ],
    atelier: 'Repères d’un usage responsable posés pour toute la journée.',
  },
  {
    heading: 'Module 2 — Fonctionnalités clés de ChatGPT et de Claude',
    duree: '1 h 45',
    points: [
      'ChatGPT : mémoire, Projects, GPTs, Canvas, connecteurs et Deep Research.',
      'Claude : Projects, base de connaissances, Artifacts, Skills et connecteurs.',
      'Comparer les deux outils sur une même tâche métier.',
    ],
    atelier: 'Prise en main sur les deux outils à partir d’un cas réel d’assistanat.',
  },
  {
    heading: 'Module 3 — Bien prompter : de la demande floue au résultat fiable',
    duree: '1 h 45',
    points: [
      'Méthode d’un bon prompt : rôle, contexte, consignes, format, vérification.',
      'Itérer, challenger l’IA et vérifier les faits avant envoi.',
      'Conserver ses meilleurs prompts pour la bibliothèque d’équipe.',
    ],
    atelier: 'Transformer une demande réelle en prompt structuré et comparer les résultats.',
  },
  {
    heading: 'Module 4 — Créer son assistant IA métier',
    duree: '2 h 15',
    points: [
      'Configurer un assistant selon son poste (travaux, comptabilité, DAF…).',
      'Rédiger le rôle, le ton et les contraintes ; déposer modèles et documents.',
      'Tester, corriger et verrouiller en trois passes.',
    ],
    atelier: 'Créer et optimiser son assistant personnalisé sur une tâche réelle.',
  },
] as const;

export const ASSISTANTS_IA_EXEMPLES = [
  'Compte rendu de chantier : synthèse, actions et responsables.',
  'Courriers et relances administratives.',
  'Synthèses et notes pour la direction administrative.',
  'Reformances clients et fournisseurs (comptabilité).',
  'Suivi de dossiers d’exécution et visas.',
  'Reformformulation et mise en forme de documents métier.',
] as const;

export const ASSISTANTS_IA_LIVRABLES = [
  'Un assistant métier personnalisé, configuré et testé sur une tâche réelle.',
  'Une méthode de prompt réutilisable et 3 à 5 prompts validés.',
  'Panorama pratique des fonctionnalités clés de ChatGPT et de Claude.',
  'Les supports et ressources pédagogiques accessibles depuis l’espace de formation.',
  'Une attestation individuelle de formation.',
] as const;

export const ASSISTANTS_IA_PEDAGOGIE = [
  '80 % de pratique et 20 % de théorie.',
  'Cas réels de l’entreprise.',
  'Exercices individuels et en binôme au sein du groupe.',
  'Démonstrations et corrections en direct.',
  'Positionnement initial.',
  'Évaluation pendant les exercices.',
  'QCM de fin de formation.',
  'Questionnaire de satisfaction.',
] as const;

export const ASSISTANTS_IA_MODALITES = [
  'Présentiel uniquement en Île-de-France.',
  'Intra-entreprise, sur site dans les locaux de l’entreprise.',
  'Groupe de 6 à 10 participants.',
  'Journée de 7 heures (09h00 — 12h00 / 13h00 — 17h00).',
  'Dates à définir selon disponibilités.',
  'Délai d’accès : sous 15 jours à 2 mois après signature de la convention.',
] as const;

/** URL contact devis avec présélection de la formation. */
export function assistantsIaDevisHref(formationTitle: string): string {
  return `${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}`;
}
