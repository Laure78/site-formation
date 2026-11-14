/** Programme NIV-13 — agents IA · 14 h sur 2 jours (840 min · 8 modules). */
import { NIV13_PROGRAMME_MODULES } from '@/lib/formation-agents-ia-autonomes-btp-content';

export const NIV13_PEDAGOGICAL_METHODS = [
  '10 h de pratique sur 14 h — démonstrations courtes et ateliers guidés',
  'Cas au choix : devis, CR de chantier ou demandes d’intervention',
  'Make pour relier les outils · Claude Code ou Codex selon le prototype',
  'Validation humaine avant toute action envoyée ou engagement contractuel',
] as const;

export const NIV13_PROGRAMME_BLOCS = NIV13_PROGRAMME_MODULES;