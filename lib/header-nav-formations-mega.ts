/**
 * Méga-menu « Formations IA BTP » — niveaux, besoins, orientation.
 */
import {
  buildFormationsIaNiveauHref,
  buildFormationsThematiqueHref,
} from '@/lib/catalogue-filter-url';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';
import { LINKS } from '@/lib/internal-links';
import type { HeaderMegaColumn, HeaderNavLink } from '@/lib/header-nav';

function buildParNiveauLinks(): HeaderNavLink[] {
  const links: HeaderNavLink[] = FORMATIONS_NIVEAUX_IA.map((n) => ({
    href: buildFormationsIaNiveauHref(n.niveau),
    label: n.labelComplet,
    description: n.descriptionMenu,
    title: `${n.accrocheNiveau} — ${n.labelComplet}`,
  }));
  links.push({
    href: `${LINKS.formations}#comparer-niveaux`,
    label: 'Comparer les niveaux',
    description: 'Durées, prérequis et objectifs des trois niveaux.',
    title: 'Comparer les niveaux IA BTP',
  });
  return links;
}

function buildParBesoinLinks(): HeaderNavLink[] {
  return [
    {
      href: buildFormationsThematiqueHref('devis-ao'),
      label: 'Devis et chiffrage',
      description: 'DCE, chiffrage et contrôle des devis.',
      title: 'Formations devis et chiffrage BTP',
    },
    {
      href: buildFormationsThematiqueHref('devis-ao'),
      label: 'Appels d’offres et mémoires techniques',
      description: 'Analyse DCE, mémoire technique, réponse commerciale.',
      title: 'Formations appels d’offres BTP',
    },
    {
      href: buildFormationsThematiqueHref('chantier-moe'),
      label: 'Organisation et suivi de chantier',
      description: 'Conduite de travaux, MOE et suivi opérationnel.',
      title: 'Formations organisation de chantier',
    },
    {
      href: LINKS.formationIaQsePreventionBtp,
      label: 'Sécurité et documents de prévention',
      description: 'PPSPS, prévention et structuration documentaire.',
      title: 'Formation IA sécurité et prévention BTP',
    },
    {
      href: buildFormationsThematiqueHref('admin-commercial'),
      label: 'Administration et gestion',
      description: 'Administratif, relances et communication.',
      title: 'Formations administration BTP',
    },
    {
      href: buildFormationsThematiqueHref('assistants-ia'),
      label: 'Assistants IA et outils sur mesure',
      description: 'Skills Claude, assistants et prototypes métier.',
      title: 'Formations assistants IA et outils BTP',
    },
  ];
}

function buildPourChoisirLinks(): HeaderNavLink[] {
  return [
    {
      href: LINKS.formationsOrientation,
      label: 'Quelle formation choisir ?',
      description: 'Questionnaire d’orientation en 4 questions.',
      title: 'Orientation formation IA BTP',
    },
    {
      href: LINKS.financement,
      label: 'Financement des formations',
      description: 'Constructys et prise en charge OPCO selon éligibilité.',
      title: 'Financement formation IA BTP',
    },
  ];
}

export function buildFormationsMegaColumns(): readonly HeaderMegaColumn[] {
  return [
    { title: 'Par niveau', links: buildParNiveauLinks() },
    { title: 'Par besoin', links: buildParBesoinLinks() },
    { title: 'Pour choisir', links: buildPourChoisirLinks() },
  ];
}

export function buildFormationsMegaQuickLinks(): readonly HeaderNavLink[] {
  return [
    {
      href: LINKS.formations,
      label: 'Toutes les formations',
      title: 'Catalogue formations IA BTP — présentiel Île-de-France',
    },
  ];
}

/** Sous-menu desktop « Formations IA BTP » — catalogue + niveaux. */
export function buildFormationsNavChildren(): readonly HeaderNavLink[] {
  return [
    {
      href: LINKS.formations,
      label: 'Toutes les formations',
      title: 'Catalogue formations IA BTP — présentiel Île-de-France',
    },
    ...FORMATIONS_NIVEAUX_IA.map((n) => ({
      href: buildFormationsIaNiveauHref(n.niveau),
      label: n.labelComplet,
      title: `${n.accrocheNiveau} — ${n.labelComplet}`,
    })),
  ];
}

/** Liens plats mobile / fallback — deux niveaux max (groupes + liens). */
export function buildFormationsMobileNavGroups(): readonly HeaderNavLink[] {
  return [
    {
      href: LINKS.formations,
      label: 'Toutes les formations',
      title: 'Catalogue complet',
    },
    {
      href: '#',
      label: 'Par niveau',
      children: buildParNiveauLinks(),
    },
    {
      href: '#',
      label: 'Par besoin',
      children: buildParBesoinLinks(),
    },
    {
      href: '#',
      label: 'Pour choisir',
      children: buildPourChoisirLinks(),
    },
  ];
}
