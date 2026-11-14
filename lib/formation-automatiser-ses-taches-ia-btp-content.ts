/**
 * Contenus éditoriaux — formation « Automatiser ses tâches avec l’IA dans le BTP » (NIV-14) · Make · 14 h.
 */
import type { CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';

export const AUTOMATISER_TACHES_RESULTAT_HERO =
  'Vous repartez avec un scénario Make testé en atelier, sa grille de tests et une fiche de fonctionnement que votre équipe peut reprendre.';

export const AUTOMATISER_TACHES_IA_OUTCOMES = [
  'Choisir une tâche répétitive BTP et cartographier déclencheur, sorties et contrôles humains.',
  'Préparer les données, anonymiser les exemples et paramétrer les connexions sur des espaces de test.',
  'Construire un scénario Make reliant au moins deux outils (formulaire, messagerie ou tableur).',
  'Intégrer une étape IA pour extraire ou préparer des contenus — avec validation avant envoi.',
  'Tester les cas limites (doublon, donnée manquante, connecteur indisponible) et configurer une alerte.',
  'Documenter le scénario (déclencheur, accès, responsable, reprise) et préparer un pilote en entreprise.',
] as const;

export const AUTOMATISER_TACHES_IA_DELIVERABLES = [
  'Un scénario Make testé sur votre cas métier',
  'Une grille de tests (5 situations)',
  'Une fiche de fonctionnement d’une page',
  'Un comparatif temps avant / après (relecture comprise)',
  'Certificat de réalisation',
] as const;

export const AUTOMATISER_TACHES_CAS_METIER = [
  {
    id: 'devis',
    label: 'Relance de devis',
    title: 'Relancer les devis restés sans réponse',
    steps: [
      { label: 'Déclencheur', text: 'L’échéance de relance arrive dans le tableau des devis.' },
      {
        label: 'Préparation',
        text: 'Make vérifie le statut et l’historique, puis prépare un brouillon si le devis est éligible.',
      },
      { label: 'Validation', text: 'Le chargé d’affaires valide le brouillon et l’envoie.' },
    ],
  },
  {
    id: 'chantier',
    label: 'Suivi chantier',
    title: 'Alimenter le tableau d’actions chantier',
    steps: [
      {
        label: 'Déclencheur',
        text: 'Un compte rendu de chantier est déposé dans le dossier de suivi.',
      },
      {
        label: 'Préparation',
        text: 'L’IA propose les actions, cite le passage source et signale les champs manquants.',
      },
      { label: 'Validation', text: 'Le conducteur valide les lignes avant leur ajout au tableau.' },
    ],
  },
  {
    id: 'intervention',
    label: 'Demandes d’intervention',
    title: 'Centraliser les demandes d’intervention',
    steps: [
      {
        label: 'Déclencheur',
        text: 'Une demande arrive dans un formulaire ou une boîte partagée.',
      },
      {
        label: 'Préparation',
        text: 'Le scénario extrait le site, le lot et le besoin, puis prépare une ligne de suivi.',
      },
      { label: 'Validation', text: 'Le responsable vérifie les données et attribue la demande.' },
    ],
  },
] as const;

export const NIV14_PROGRAMME_MODULES: readonly CatalogueProgramModule[] = [
  {
    title: 'MODULE 1 — Choisir une tâche répétitive (1 h 30)',
    points: [
      'Cartographier le processus et mesurer le temps actuel',
      'Choisir le déclencheur, la sortie et le contrôle attendu',
      'Identifier les risques juridiques ou contractuels à exclure',
    ],
    practice: 'Sur un processus réel de votre entreprise (devis, CR ou demandes).',
  },
  {
    title: 'MODULE 2 — Préparer les données et les accès (1 h 30)',
    points: [
      'Repérer les champs utiles et les sources de vérité',
      'Anonymiser les exemples et jeux de tests',
      'Paramétrer les connexions Make sur des comptes ou espaces de test',
    ],
  },
  {
    title: 'MODULE 3 — Relier deux outils avec Make (2 h)',
    points: [
      'Construire un scénario guidé étape par étape',
      'Exemple : une demande reçue via formulaire crée une ligne dans un tableau',
      'Journaliser les exécutions pour le débogage',
    ],
    deliverable: 'Premier flux opérationnel entre deux outils.',
  },
  {
    title: 'MODULE 4 — Ajouter une étape IA et une validation (2 h)',
    points: [
      'Extraire des champs ou générer un brouillon avec l’IA',
      'Contrôler les données manquantes ou incohérentes',
      'Bloquer l’envoi tant que le responsable n’a pas validé',
    ],
  },
  {
    title: 'MODULE 5 — Monter son scénario BTP (2 h 30)',
    points: [
      'Réaliser le cas choisi : relances de devis, actions de CR ou demandes d’intervention',
      'Ajuster le périmètre pour rester conforme au cahier des charges interne',
      'Prévoir le point de validation humain avant toute action externe',
    ],
    practice: 'Atelier sur votre cas métier prioritaire (données anonymisées).',
  },
  {
    title: 'MODULE 6 — Tester cinq situations (2 h)',
    points: [
      'Cas standard, doublon, donnée manquante',
      'Sortie IA invalide et connecteur indisponible',
      'Configurer une alerte et une procédure de reprise',
    ],
    deliverable: 'Grille de tests complétée.',
  },
  {
    title: 'MODULE 7 — Documenter et transmettre (1 h 30)',
    points: [
      'Décrire déclencheur, accès, validation, responsable et reprise',
      'Rédiger une fiche d’une page lisible par l’équipe',
      'Définir qui maintient le scénario après la formation',
    ],
    deliverable: 'Fiche de fonctionnement.',
  },
  {
    title: 'MODULE 8 — Évaluer et préparer le pilote (1 h)',
    points: [
      'Présenter le scénario et comparer le temps avant / après',
      'Inclure le temps de relecture humaine dans le calcul',
      'Définir les conditions de mise en service et de montée en charge',
    ],
  },
];