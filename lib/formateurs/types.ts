import type { DomaineId } from '@/data/catalogue-2027';

/** Identifiants stables — ne pas changer une fois publiés. */
export type FormateurId =
  | 'laure-olivie'
  | 'julien-morel'
  | 'claire-delmas'
  | 'nicolas-perrin'
  | 'sophie-laurent';

/**
 * Portrait — photo réelle (confirmé) ou avatar initiales (démo / slot).
 * Remplacer `initials` par `photo` dès qu’un portrait professionnel est autorisé.
 */
export type FormateurPortrait =
  | {
      kind: 'photo';
      src: string;
      alt: string;
      width: number;
      height: number;
    }
  | {
      kind: 'initials';
      initials: string;
      /** Libellé accessible (ex. « Portrait à venir — Julien Morel »). */
      label: string;
    };

export type FormateurStatus = 'confirmed' | 'demo';

/**
 * Profil formateur — source unique (biographies non dupliquées ailleurs).
 * `formationCodes` : codes catalogue `NIV-*` (liens résolus via `data/formations`).
 */
export type FormateurProfile = {
  id: FormateurId;
  slug: string;
  prenom: string;
  nom: string;
  intitule: string;
  parcours: string;
  specialites: readonly string[];
  /** Domaines catalogue 2027 — section « Les formateurs de ce domaine ». */
  domaineIds: readonly DomaineId[];
  /** Codes formation catalogue associés (hors sessions LMS). */
  formationCodes: readonly string[];
  /** Si true, associée à toutes les formations publiées du catalogue NIV. */
  animatesAllPublished?: boolean;
  portrait: FormateurPortrait;
  status: FormateurStatus;
  /** Lien profil détaillé (confirmés uniquement, ex. /a-propos). */
  profileHref?: string;
};

export type FormateurFormationLink = {
  code: string;
  titre: string;
  href: string;
  duree: string;
};
