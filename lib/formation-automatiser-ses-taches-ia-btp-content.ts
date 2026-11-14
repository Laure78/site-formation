/**
 * Contenus éditoriaux — formation « Automatiser ses tâches avec l’IA dans le BTP » (NIV-14) · Make · 14 h.
 */
import type { CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';

export const AUTOMATISER_TACHES_RESULTAT_HERO =
  'Un scénario Make testé sur cinq situations, sa grille de tests et une fiche de fonctionnement pour que votre équipe puisse le vérifier, l’arrêter et le reprendre.';

export const AUTOMATISER_TACHES_IA_OUTCOMES = [
  'Choisir une tâche répétitive BTP et cartographier déclencheur, sorties et contrôles humains.',
  'Préparer les données, anonymiser les exemples et paramétrer les connexions sur des espaces de test.',
  'Construire un scénario Make reliant au moins deux outils (formulaire, messagerie ou tableur).',
  'Intégrer une étape IA pour extraire ou préparer des contenus — avec validation avant envoi.',
  'Tester cinq situations : cas standard, doublon, donnée manquante, sortie IA invalide, connecteur indisponible — et configurer une alerte.',
  'Comparer le temps de traitement avant et après (relecture comprise), mesure réalisée par le participant.',
  'Documenter le scénario (déclencheur, accès, responsable, reprise) et préparer un pilote en entreprise.',
] as const;

export const AUTOMATISER_TACHES_IA_DELIVERABLES = [
  'Un scénario Make testé sur cinq situations en atelier',
  'Une grille de tests (5 situations)',
  'Une fiche de fonctionnement d’une page',
  'Un comparatif temps avant / après (relecture comprise)',
  'Certificat de réalisation',
] as const;

export const AUTOMATISER_TACHES_CAS_METIER = [
  {
    id: 'devis',
    label: 'Relances de devis',
    title: 'Relances de devis',
    steps: [
      {
        label: 'Déclencheur',
        text: 'À l’échéance, le scénario vérifie le statut du devis et l’historique des relances.',
      },
      {
        label: 'Résultat préparé',
        text: 'Il prépare un brouillon de relance si le devis est éligible.',
      },
      {
        label: 'Validation humaine',
        text: 'Le chargé d’affaires valide le brouillon avant envoi.',
      },
    ],
  },
  {
    id: 'chantier',
    label: 'Comptes rendus de chantier',
    title: 'Comptes rendus de chantier',
    steps: [
      {
        label: 'Déclencheur',
        text: 'Au dépôt d’un compte rendu de chantier dans le dossier de suivi.',
      },
      {
        label: 'Résultat préparé',
        text: 'L’IA propose les actions à reporter, cite le passage source et signale les informations manquantes.',
      },
      {
        label: 'Validation humaine',
        text: 'Le conducteur valide les lignes avant leur ajout au tableau de suivi.',
      },
    ],
  },
  {
    id: 'intervention',
    label: 'Demandes d’intervention',
    title: 'Demandes d’intervention',
    steps: [
      {
        label: 'Déclencheur',
        text: 'À la réception d’une demande (formulaire ou messagerie partagée).',
      },
      {
        label: 'Résultat préparé',
        text: 'Le scénario prépare une ligne avec le site, le lot et le besoin.',
      },
      {
        label: 'Validation humaine',
        text: 'Le responsable vérifie les données et attribue la demande.',
      },
    ],
  },
] as const;

export const NIV14_PROGRAMME_MODULES: readonly CatalogueProgramModule[] = [
  {
    title: 'Jour 1 — MODULE 1 — Choisir une tâche répétitive (1 h 30)',
    points: [
      'Choisir une tâche selon sa fréquence, le temps qu’elle prend et la clarté de ses étapes',
      'Cartographier le processus et le contrôle humain attendu',
      'Identifier les risques juridiques ou contractuels à exclure',
    ],
    practice: 'Sur un processus réel de votre entreprise (devis, CR ou demandes).',
  },
  {
    title: 'Jour 1 — MODULE 2 — Préparer les données et les accès (1 h 30)',
    points: [
      'Repérer les champs utiles et les sources de vérité',
      'Anonymiser les exemples et jeux de tests',
      'Paramétrer les connexions Make sur des comptes ou espaces de test',
    ],
  },
  {
    title: 'Jour 1 — MODULE 3 — Relier deux outils avec Make (2 h)',
    points: [
      'Construire un scénario guidé étape par étape',
      'Exemple : une demande reçue via formulaire crée une ligne dans un tableau',
      'Journaliser les exécutions pour le débogage',
    ],
    deliverable: 'Premier flux opérationnel entre deux outils.',
  },
  {
    title: 'Jour 1 — MODULE 4 — Ajouter une étape IA et une validation (2 h)',
    points: [
      'Extraire des champs ou générer un brouillon avec l’IA',
      'Contrôler les données manquantes ou incohérentes',
      'Bloquer l’envoi tant que le responsable n’a pas validé',
    ],
  },
  {
    title: 'Jour 2 — MODULE 5 — Monter son scénario BTP (2 h 30)',
    points: [
      'Réaliser le cas choisi : relances de devis, actions de CR ou demandes d’intervention',
      'Ajuster le périmètre pour rester conforme au cahier des charges interne',
      'Prévoir le point de validation humain avant toute action externe',
    ],
    practice: 'Atelier sur votre cas métier prioritaire (données anonymisées).',
  },
  {
    title: 'Jour 2 — MODULE 6 — Tester cinq situations (2 h)',
    points: [
      'Cas standard, doublon, donnée manquante, sortie IA invalide, connecteur indisponible',
      'Configurer une alerte et une procédure de reprise',
    ],
    deliverable: 'Grille de tests complétée.',
  },
  {
    title: 'Jour 2 — MODULE 7 — Documenter et transmettre (1 h 30)',
    points: [
      'Décrire déclencheur, accès, validation, responsable et reprise',
      'Rédiger une fiche d’une page lisible par l’équipe',
      'Définir qui maintient le scénario après la formation',
    ],
    deliverable: 'Fiche de fonctionnement.',
  },
  {
    title: 'Jour 2 — MODULE 8 — Évaluer et préparer le pilote (1 h)',
    points: [
      'Présenter le scénario testé en atelier',
      'Comparer le temps de traitement avant et après, relecture comprise (mesure par le participant)',
      'Définir les conditions de mise en service et de montée en charge',
    ],
  },
];