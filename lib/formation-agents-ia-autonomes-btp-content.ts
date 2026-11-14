/**
 * Contenus éditoriaux — formation « Construire ses agents IA pour le BTP » (NIV-13) · 14 h.
 */
import type { CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';

export const AGENTS_IA_NIV13_HERO_REPARTEZ =
  'Un prototype testé en atelier, sa fiche de mission et de validation, une grille de tests et un plan de supervision.';

export const AGENTS_IA_NIV13_PILOTE_TEXTE =
  'Vous testez cinq situations : un cas standard, une donnée manquante, un doublon, une consigne ambiguë et un outil indisponible. Vous vérifiez les alertes et les validations prévues. Puis vous comparez le temps de traitement avant et après, relecture comprise, et estimez le coût d’une exécution.';

export const AGENTS_IA_AUTONOMES_OUTCOMES = [
  'Choisir un processus répétitif et déterminer son niveau d’autonomie.',
  'Définir la mission de l’agent, ses sources, ses outils et ses limites.',
  'Construire un prototype relié à des outils de test et produire une sortie exploitable.',
  'Tester les cas ambigus, déclencher une validation et suivre les erreurs et les coûts.',
] as const;

export const AGENTS_IA_CAS_METIER = [
  {
    id: 'devis',
    label: 'Devis & relances',
    title: 'Dirigeant ou chargé d’affaires',
    summary:
      'Repérer les devis à relancer et préparer un brouillon à valider avant envoi.',
    steps: [
      {
        label: 'Repérage',
        text: 'L’agent lit le suivi commercial ou le tableau de devis et liste les dossiers à relancer.',
      },
      {
        label: 'Préparation',
        text: 'Il prépare un brouillon de relance à partir des données disponibles — sans envoi automatique.',
      },
      {
        label: 'Validation',
        text: 'Le dirigeant ou le chargé d’affaires valide le message avant envoi au client.',
      },
    ],
  },
  {
    id: 'chantier',
    label: 'CR de chantier',
    title: 'Conducteur de travaux',
    summary:
      'Extraire les actions d’un compte rendu, citer la source et signaler les responsables ou échéances manquants.',
    steps: [
      {
        label: 'Extraction',
        text: 'L’agent propose les actions à partir du CR en citant le passage source.',
      },
      {
        label: 'Contrôle',
        text: 'Il signale les dates ou responsables manquants avant toute mise à jour.',
      },
      {
        label: 'Validation',
        text: 'Le conducteur valide les lignes avant leur ajout au tableau de suivi.',
      },
    ],
  },
  {
    id: 'support',
    label: 'Demandes d’intervention',
    title: 'Fonctions support',
    summary:
      'Qualifier une demande d’intervention et proposer son affectation.',
    steps: [
      {
        label: 'Qualification',
        text: 'L’agent extrait le site, le lot et le besoin à partir du formulaire ou de l’email.',
      },
      {
        label: 'Proposition',
        text: 'Il prépare une proposition d’affectation et liste les informations encore manquantes.',
      },
      {
        label: 'Validation',
        text: 'Le responsable confirme la priorité et l’attribution.',
      },
    ],
  },
] as const;

/** @deprecated Remplacé par `AGENTS_IA_CAS_METIER` — conservé pour imports historiques. */
export const AGENTS_IA_METIER_CARDS = AGENTS_IA_CAS_METIER.map((c) => ({
  id: c.id,
  title: c.title,
  objectif: c.summary,
}));

export const AGENTS_IA_DELIVERABLES = [
  'Prototype d’agent testé en atelier',
  'Fiche de mission et de validation',
  'Grille de tests (5 situations)',
  'Plan de supervision avec indicateurs de temps et de coût',
  'Certificat de réalisation',
] as const;

export const NIV13_PROGRAMME_MODULES: readonly CatalogueProgramModule[] = [
  {
    title: 'Jour 1 — MODULE 1 — Choisir le processus (1 h 30)',
    points: [
      'Comparer assistant, automatisation et agent',
      'Relever le temps de traitement actuel',
      'Choisir un résultat mesurable sur un processus répétitif',
    ],
    practice: 'Sur un processus de votre PME (données anonymisées ou fictives).',
  },
  {
    title: 'Jour 1 — MODULE 2 — Rédiger la fiche de mission (1 h 30)',
    points: [
      'Définir le déclencheur, les sources et les actions permises',
      'Lister les cas à transmettre à l’équipe',
      'Fixer le format de sortie attendu',
    ],
    deliverable: 'Fiche de mission et de validation.',
  },
  {
    title: 'Jour 1 — MODULE 3 — Construire le prototype (2 h)',
    points: [
      'Relier les outils avec Make dans un environnement de test',
      'Configurer les règles de décision',
      'Utiliser Claude Code ou Codex selon le besoin du prototype',
    ],
    practice: 'Connexions sur espaces de test — accès vérifiés avant la session.',
  },
  {
    title: 'Jour 1 — MODULE 4 — Encadrer les actions de l’agent (2 h)',
    points: [
      'Limiter les accès et définir les données autorisées',
      'Placer les brouillons en attente de validation',
      'Bloquer les engagements contractuels non validés',
    ],
    deliverable: 'Premier prototype avec points de contrôle humains.',
  },
  {
    title: 'Jour 2 — MODULE 5 — Tester cinq situations (1 h 30)',
    points: [
      'Cas standard, donnée manquante, doublon',
      'Consigne ambiguë et outil indisponible',
      'Vérifier alertes et validations prévues',
    ],
    deliverable: 'Grille de tests complétée.',
  },
  {
    title: 'Jour 2 — MODULE 6 — Corriger et rejouer (1 h 30)',
    points: [
      'Ajuster consignes et règles Make',
      'Vérifier la source de chaque information utile',
      'Confirmer le blocage des actions non validées',
    ],
  },
  {
    title: 'Jour 2 — MODULE 7 — Organiser la supervision (2 h)',
    points: [
      'Configurer un journal et une alerte',
      'Désigner le responsable de la revue',
      'Définir comment suspendre l’agent',
    ],
    deliverable: 'Plan de supervision.',
  },
  {
    title: 'Jour 2 — MODULE 8 — Mesurer et présenter le prototype (2 h)',
    points: [
      'Comparer le temps de traitement avant et après (relecture comprise)',
      'Estimer le coût d’exécution',
      'Définir le périmètre du pilote en entreprise',
    ],
    deliverable: 'Synthèse gains temps / coût et périmètre pilote.',
  },
];