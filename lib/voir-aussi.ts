/**
 * Câblage « Voir aussi » — pages métier et géo (hub + /formations + frères).
 */
import type { VoirAussiProps } from '@/components/VoirAussi';
import { LINKS } from '@/lib/internal-links';

/** Département de référence OFC (siège Guyancourt) — défaut pages métier. */
export const VOIR_AUSSI_DEPT_DEFAUT = {
  href: LINKS.formationIaBtpYvelines78,
  label: 'Formation IA BTP Yvelines (78)',
} as const;

export const VOIR_AUSSI_DEPTS = {
  paris: { href: LINKS.formationIaBtpParis, label: 'Formation IA BTP Paris (75)' },
  seineEtMarne: {
    href: LINKS.formationIaBtpSeineEtMarne77,
    label: 'Formation IA BTP Seine-et-Marne (77)',
  },
  yvelines: VOIR_AUSSI_DEPT_DEFAUT,
  essonne: { href: LINKS.formationIaBtpEssonne91, label: 'Formation IA BTP Essonne (91)' },
  hautsDeSeine: {
    href: LINKS.formationIaBtpHautsDeSeine92,
    label: 'Formation IA BTP Hauts-de-Seine (92)',
  },
  seineSaintDenis: {
    href: LINKS.formationIaBtpSeineSaintDenis93,
    label: 'Formation IA BTP Seine-Saint-Denis (93)',
  },
  valDeMarne: {
    href: LINKS.formationIaBtpValDeMarne94,
    label: 'Formation IA BTP Val-de-Marne (94)',
  },
  valDoise: { href: LINKS.formationIaBtpValDoise95, label: "Formation IA BTP Val-d'Oise (95)" },
  ileDeFrance: {
    href: LINKS.formationIleDeFrance,
    label: 'Formation IA BTP Île-de-France',
  },
} as const;

type DeptKey = keyof typeof VOIR_AUSSI_DEPTS;

/**
 * Pages métier `/formation-ia-*-btp` :
 * hub = catalogue `/formations` + département IDF le plus pertinent.
 */
export function voirAussiMetierProps(options?: {
  dept?: DeptKey;
  currentPath?: string;
  excludeHrefs?: readonly string[];
}): VoirAussiProps {
  const dept = VOIR_AUSSI_DEPTS[options?.dept ?? 'yvelines'];
  return {
    hubHref: LINKS.formations,
    hubLabel: 'Catalogue des formations IA pour le BTP',
    links: [{ href: dept.href, label: dept.label }],
    currentPath: options?.currentPath,
    excludeHrefs: options?.excludeHrefs,
  };
}

/**
 * Pages département `/formation-ia-btp-*` :
 * hub = IDF + `/formations`.
 */
export function voirAussiDepartementProps(options?: {
  currentPath?: string;
  excludeHrefs?: readonly string[];
}): VoirAussiProps {
  return {
    hubHref: LINKS.formationIleDeFrance,
    hubLabel: 'Formation IA BTP Île-de-France',
    links: [],
    currentPath: options?.currentPath,
    excludeHrefs: options?.excludeHrefs,
  };
}

/**
 * Pages ville (SQY, Morangis, Longjumeau…) :
 * hub = page département + IDF (+ `/formations` auto).
 */
export function voirAussiVilleProps(
  dept: DeptKey,
  options?: {
    currentPath?: string;
    excludeHrefs?: readonly string[];
  }
): VoirAussiProps {
  const d = VOIR_AUSSI_DEPTS[dept];
  return {
    hubHref: d.href,
    hubLabel: d.label,
    links: [
      {
        href: LINKS.formationIleDeFrance,
        label: 'Formation IA BTP Île-de-France',
      },
    ],
    currentPath: options?.currentPath,
    excludeHrefs: options?.excludeHrefs,
  };
}

/** Hub IDF (page régionale) : catalogue + un département voisin. */
export function voirAussiIdfProps(options?: {
  currentPath?: string;
  excludeHrefs?: readonly string[];
}): VoirAussiProps {
  return {
    hubHref: LINKS.formations,
    hubLabel: 'Catalogue des formations IA pour le BTP',
    links: [VOIR_AUSSI_DEPT_DEFAUT],
    currentPath: options?.currentPath,
    excludeHrefs: options?.excludeHrefs,
  };
}
