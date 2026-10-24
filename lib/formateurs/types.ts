import type { DomaineId, ModuleCode, SousDomaineIaChantierId } from '@/data/catalogue-2027';

/** Identifiants stables — ne pas changer une fois publiés. */
export type FormateurId =
  | 'laure-olivie'
  | 'julien-morel'
  | 'thomas-garnier'
  | 'marc-delcourt'
  | 'nicolas-perrin'
  | 'claire-rousseau'
  | 'intervenante-assistance-travaux-btp'
  | 'formateur-coordination-sps';

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

/**
 * Visibilité sur le hub /formateurs (distinct de `status` confirmé/démo).
 * `a-confirmer` : masqué en production — TODO(Laure) : renseigner par profil.
 */
export type FormateurAffichageHub = 'actif' | 'a-confirmer';

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
  /**
   * Fiche hub uniquement — identité ou associations formations non validées ;
   * exclu des sections « formateurs de ce domaine » sur le catalogue.
   */
  hubOnly?: boolean;
  /**
   * Identité ou parcours en cours de validation — affiche un encart et adoucit
   * la présentation (ne pas lire la bio comme un fait établi).
   */
  profileDraft?: boolean;
  /** Sous-domaines IA chantier liés (hub) — hors modules métier animés. */
  hubSousDomaines?: readonly {
    id: SousDomaineIaChantierId;
    /** Ex. coanimation IA avec Laure Olivié — à confirmer. */
    note?: string;
  }[];
  /** Modalité pédagogique (ligne sous la bio). */
  modalite?: string;
  portrait: FormateurPortrait;
  status: FormateurStatus;
  /** Publication hub /formateurs — défaut `actif`. */
  affichageHub?: FormateurAffichageHub;
  /** Lien profil détaillé (confirmés uniquement, ex. /a-propos). */
  profileHref?: string;
};

export type FormateurFormationLink = {
  code: string;
  titre: string;
  href: string;
  duree: string;
  disponibilite: 'disponible';
  tarifLabel?: string;
};

export type FormateurModuleLink = {
  code: string;
  titre: string;
  href: string;
  ctaLabel: 'Demander le programme' | 'Voir le programme' | 'Être prévenu de l\'ouverture';
  disponibilite: 'disponible' | 'ouverture-2027';
  disponibiliteLabel: string;
  dureeLabel: string;
};

export type FormateurSousDomaineLink = {
  id: SousDomaineIaChantierId;
  titre: string;
  href: string;
  note?: string;
};
