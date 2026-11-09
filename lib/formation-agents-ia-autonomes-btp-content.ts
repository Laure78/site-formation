/**
 * Contenus éditoriaux — formation agents IA autonomes (NIV-13) · Make AI Agents.
 */

export const AGENTS_IA_AUTONOMES_OUTCOMES = [
  'Comprendre le fonctionnement d’un agent IA autonome (déclencheur, actions, contrôles).',
  'Identifier les tâches répétitives à automatiser dans une PME du BTP.',
  'Configurer un scénario Make AI Agents sur un cas métier concret (dirigeant ou conducteur de travaux).',
  'Relier email, tableur ou agenda à un flux automatisé avec validation humaine.',
  'Tester, ajuster et documenter son agent avant toute mise en production.',
  'Définir un plan de déploiement réaliste et conforme (RGPD, confidentialité).',
] as const;

export const AGENTS_IA_METIER_CARDS = [
  {
    id: 'dirigeant',
    title: 'Dirigeant de PME BTP',
    objectif:
      'Automatiser le suivi des devis, préparer les relances clients et obtenir une synthèse commerciale exploitable — sans programmation.',
  },
  {
    id: 'conducteur-travaux',
    title: 'Conducteur de travaux',
    objectif:
      'Suivre les actions chantier, détecter les échéances et préparer les rappels aux intervenants à partir de vos outils du quotidien.',
  },
] as const;

export const AGENTS_IA_DELIVERABLES = [
  'Un scénario Make AI Agents configuré et testé sur votre cas métier',
  'Schéma du flux (déclencheur → actions → contrôle humain)',
  'Checklist de validation avant activation en entreprise',
  'Plan d’action 30 jours pour une seconde automatisation',
  'Certificat de réalisation',
] as const;
