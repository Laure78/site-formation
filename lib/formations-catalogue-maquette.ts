/**
 * Données UX page catalogue `/formations` — maquette 2026 (textes alignés charte, pas de tarifs inventés).
 */
import type { FormationNiveau } from '@/data/formations';

/** Bandeau formats — Express / Approfondi / Avancé. */
export const CATALOGUE_MAQUETTE_FORMATS = [
  {
    id: 'express',
    titre: 'Express',
    duree: '4 h',
    description: 'Acquérir les bases rapidement',
  },
  {
    id: 'approfondi',
    titre: 'Approfondi',
    duree: '7 h',
    description: 'Mettre en pratique sur vos cas métiers',
  },
  {
    id: 'avance',
    titre: 'Avancé',
    duree: '14 h',
    description: 'Créer et déployer vos outils IA métier',
  },
] as const;

/** Badges cartes — libellés maquette (distincts du méga-menu si besoin). */
export function catalogueMaquetteNiveauBadge(niveau: FormationNiveau): string {
  if (niveau === 1) return 'Niveau Débutant';
  if (niveau === 2) return 'Niveau Métiers';
  return 'Niveau Avancé';
}

export function catalogueMaquetteNiveauBadgeTone(
  niveau: FormationNiveau,
): 'debutant' | 'metiers' | 'avance' {
  if (niveau === 1) return 'debutant';
  if (niveau === 2) return 'metiers';
  return 'avance';
}

/** Méthode pédagogique — 3 piliers maquette. */
export const CATALOGUE_MAQUETTE_METHODE = [
  {
    id: 'cas-reels',
    titre: 'Des cas réels BTP',
    description:
      'Travail sur vos documents métier (devis, DCE, CCTP, comptes rendus) — anonymisés si nécessaire.',
  },
  {
    id: 'pratique',
    titre: 'Une mise en pratique intensive',
    description:
      'Exercices guidés avec ChatGPT ou Claude : environ 70 % du temps en atelier, validation humaine des productions.',
  },
  {
    id: 'resultats',
    titre: 'Des résultats concrets',
    description:
      'Méthodes, trames, prompts et supports réutilisables dès le lendemain en entreprise.',
  },
] as const;

export const CATALOGUE_MAQUETTE_MODALITES = [
  { id: 'presentiel', label: 'Présentiel en Île-de-France' },
  { id: 'cas', label: 'Cas concrets BTP' },
  { id: 'opco', label: 'Financement OPCO selon éligibilité' },
] as const;

export const CATALOGUE_MAQUETTE_HERO_CHECKS = [
  'Organisme de formation certifié Qualiopi',
  'Présentiel en Île-de-France',
  'Exercices sur vos documents et cas réels',
] as const;
