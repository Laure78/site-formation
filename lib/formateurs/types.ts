import type { DomaineId, ModuleCode } from '@/data/catalogue-2027';

/** Identifiants stables — ne pas changer une fois publiés. */
export type FormateurId =
  | 'laure-olivie'
  | 'julien-morel'
  | 'thomas-garnier'
  | 'marc-delcourt'
  | 'nicolas-perrin'
  | 'claire-rousseau';

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
      /** Cadrage `object-position` (portraits visage / épaules). */
      objectPosition?: string;
    }
  | {
      kind: 'initials';
      initials: string;
      /** Libellé accessible (ex. « Portrait à venir — Julien Morel »). */
      label: string;
    };

export type FormateurStatus = 'confirmed' | 'demo';

export type FormateurExperienceStep = {
  /** Ex. « 10 ans » — optionnel. */
  periode?: string;
  titre: string;
  detail?: string;
};

/**
 * Profil formateur — source unique (biographies non dupliquées ailleurs).
 * `formationCodes` : codes catalogue `NIV-*` (liens résolus via `data/formations`).
 * `moduleCodes` : modules catalogue 2027 (`TRA-01`, etc.).
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
  /** Codes formation catalogue IA NIV (Laure). */
  formationCodes: readonly string[];
  /** Modules catalogue parcours métiers 2027. */
  moduleCodes?: readonly ModuleCode[];
  /** Parcours professionnel — affiché sur la fiche hub. */
  experiences?: readonly FormateurExperienceStep[];
  /** Formations et certifications professionnelles. */
  formationsProfessionnelles?: readonly string[];
  /** Si true, associée à toutes les formations publiées du catalogue NIV. */
  animatesAllPublished?: boolean;
  /** Codes NIV affichés sur le hub /formateurs (sans lister tout le catalogue). */
  formationCodesHub?: readonly string[];
  /** Titre de la section formations sur le hub (ex. spécialités). */
  formationsHubLabel?: string;
  /** Mise en avant sobre sur la page /formateurs. */
  featuredOnHub?: boolean;
  /** Modalité pédagogique (ligne sous la bio). */
  modalite?: string;
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

export type FormateurModuleLink = {
  code: string;
  titre: string;
  href: string;
  ctaLabel: 'Demander le programme' | 'Voir le programme';
  disponibiliteLabel: string;
  dureeLabel: string;
};
