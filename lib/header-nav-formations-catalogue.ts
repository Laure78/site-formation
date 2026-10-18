/**
 * Sous-menu « Formations IA BTP » — liens directs vers les fiches catalogue publiées, groupés par niveau.
 */
import { formationHref, type Formation } from '@/data/formations';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';
import type { HeaderMegaColumn, HeaderNavLink } from '@/lib/header-nav';

const NIVEAU_PREFIX = /^Niveau\s+[123]\s*[—–-]\s*/iu;
const NIVEAU_SUFFIX =
  /\s*[—–-]\s*(Niveau\s+[123](\s*[—–-]\s*(Débutant|Intermédiaire|Avancé))?|Débutant|Intermédiaire|Avancé)\s*$/iu;

/** Retire les mentions de niveau du libellé menu uniquement (pas le titre de page). */
export function formationMenuLabel(titre: string): string {
  let label = titre.trim();
  label = label.replace(NIVEAU_PREFIX, '');
  label = label.replace(NIVEAU_SUFFIX, '');
  return label.trim() || titre.trim();
}

function formationToNavLink(formation: Formation): HeaderNavLink {
  const label = formation.titre.trim();
  const duree = formation.duree.trim();
  return {
    href: formationHref(formation),
    label,
    title: duree ? `${label} — ${duree}` : label,
    description: duree || undefined,
  };
}

function collectPublishedFormationLinks(at: Date): HeaderNavLink[] {
  const seen = new Set<string>();
  const links: HeaderNavLink[] = [];

  for (const formation of getPublishedFormations(at)) {
    const href = formationHref(formation);
    if (seen.has(href)) continue;
    seen.add(href);
    links.push(formationToNavLink(formation));
  }

  return links;
}

/** Trois colonnes desktop — titres de niveau + intitulés catalogue. */
export function buildFormationsNavMegaColumns(at: Date = new Date()): readonly HeaderMegaColumn[] {
  const byNiveau = new Map<number, HeaderNavLink[]>();
  for (const def of FORMATIONS_NIVEAUX_IA) {
    byNiveau.set(def.niveau, []);
  }

  const seen = new Set<string>();
  for (const formation of getPublishedFormations(at)) {
    const href = formationHref(formation);
    if (seen.has(href)) continue;
    seen.add(href);
    byNiveau.get(formation.niveau)?.push(formationToNavLink(formation));
  }

  return FORMATIONS_NIVEAUX_IA.map((def) => ({
    title: def.labelComplet,
    links: byNiveau.get(def.niveau) ?? [],
  }));
}

/** @deprecated Liste plate — préférer megaColumns / mobile groups. */
export function buildFormationsNavChildren(at: Date = new Date()): readonly HeaderNavLink[] {
  return collectPublishedFormationLinks(at);
}
