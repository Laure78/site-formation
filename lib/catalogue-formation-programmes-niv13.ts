/** Programme NIV-13 — agents IA autonomes · Make · 7 h (420 min). */
import type { CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';

export const NIV13_PEDAGOGICAL_METHODS = [
  'Ateliers sur scénarios réels (devis, relances, échéances chantier)',
  '70 % de pratique sur Make AI Agents',
  'Validation humaine avant toute action envoyée',
  'Deux fils rouges métier au choix (dirigeant / conducteur de travaux)',
] as const;

export const NIV13_PROGRAMME_BLOCS: readonly CatalogueProgramModule[] = [
  {
    title: 'MODULE 1 — Agents IA et automatisation dans le BTP (60 min)',
    points: [
      'Différence assistant conversationnel / agent autonome',
      'Cas d’usage BTP : relances, synthèses, rappels d’échéances',
      'Cadre RGPD, confidentialité et limites de l’automatisation',
      'Livrable : Cartographie des tâches répétitives de votre entreprise',
    ],
  },
  {
    title: 'MODULE 2 — Prise en main Make AI Agents (55 min)',
    points: [
      'Interface Make : scénarios, connexions, historique',
      'Déclencheurs (email, formulaire, agenda, fichier)',
      'Premier scénario guidé pas à pas',
      'Livrable : Compte Make opérationnel + premier flux test',
    ],
  },
  {
    title: 'MODULE 3 — Parcours dirigeant : devis et relances (70 min)',
    points: [
      'Suivi des devis en attente et relances clients',
      'Synthèse commerciale hebdomadaire (sans envoi automatique sans validation)',
      'Points de contrôle humain dans le scénario',
      'Livrable : Scénario « suivi devis » documenté',
    ],
    practice: 'Sur vos modèles de devis ou tableaux de suivi (anonymisés).',
  },
  {
    title: 'MODULE 4 — Parcours conducteur de travaux : chantier et échéances (70 min)',
    points: [
      'Suivi des actions chantier et rappels aux intervenants',
      'Détection d’échéances (réunion, livraison, contrôle)',
      'Préparation de messages — envoi uniquement après validation',
      'Livrable : Scénario « échéances chantier » documenté',
    ],
    practice: 'Sur planning ou liste d’actions type (données fictives ou anonymisées).',
  },
  {
    title: 'MODULE 5 — Connexions outils et fiabilisation (55 min)',
    points: [
      'Relier messagerie, tableur ou CRM selon votre stack',
      'Gestion des erreurs et journaux d’exécution',
      'Tests sur cas limites (donnée manquante, doublon)',
      'Livrable : Checklist de tests avant activation',
    ],
  },
  {
    title: 'MODULE 6 — Déploiement et plan d’action (50 min)',
    points: [
      'Documenter le scénario pour l’équipe',
      'Droits d’accès et référent interne',
      'Plan 30 jours : deuxième automatisation prioritaire',
      'Bilan, évaluation des acquis et certificat',
    ],
  },
];
