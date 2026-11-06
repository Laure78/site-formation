/**
 * Données UX page catalogue `/formations` — maquette 2026 (textes alignés charte, pas de tarifs inventés).
 */
import type { FormationNiveau } from '@/data/formations';

/** Bandeau formats — Débutant / Avancé / Approfondi (catalogue IA BTP). */
export const CATALOGUE_MAQUETTE_FORMATS = [
  {
    id: 'debutant',
    titre: 'Débutant',
    duree: '4 h',
    description: 'Les bases de l’IA — format demi-journée',
  },
  {
    id: 'avance',
    titre: 'Avancé',
    duree: '4 h',
    description: 'Sessions métier et assistants — demi-journée pratique',
  },
  {
    id: 'approfondi',
    titre: 'Approfondi',
    duree: '14 h',
    description: 'Applications métier BTP avec l’IA — 2 jours',
  },
] as const;

/** Badges cartes — libellés maquette (distincts du méga-menu si besoin). */
export function catalogueMaquetteNiveauBadge(ref: string, niveau: FormationNiveau): string {
  if (ref === 'NIV-10') return 'Niveau Approfondi';
  if (niveau === 1) return 'Niveau Débutant';
  if (niveau === 2) return 'Niveau Avancé';
  return 'Niveau Approfondi';
}

export function catalogueMaquetteNiveauBadgeTone(
  ref: string,
  niveau: FormationNiveau,
): 'debutant' | 'avance' | 'approfondi' {
  if (ref === 'NIV-10' || niveau === 3) return 'approfondi';
  if (niveau === 1) return 'debutant';
  return 'avance';
}

/** Classes badge carte — charte OFC (bleu clair + accent #377CF3, pas indigo/violet). */
export const CATALOGUE_MAQUETTE_NIVEAU_BADGE_CLASS =
  'bg-[#EFF6FF] text-[#377CF3] ring-1 ring-[#377CF3]/15';

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
