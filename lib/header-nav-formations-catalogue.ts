/**
 * Sous-menu « Formations IA BTP » — liens directs vers les fiches catalogue publiées.
 */
import { formationHref } from '@/data/formations';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import type { HeaderNavLink } from '@/lib/header-nav';

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

/** Ordre catalogue = ordre éditorial `FORMATIONS` filtré aux fiches publiées. */
export function buildFormationsNavChildren(at: Date = new Date()): readonly HeaderNavLink[] {
  const seen = new Set<string>();
  const links: HeaderNavLink[] = [];

  for (const formation of getPublishedFormations(at)) {
    const href = formationHref(formation);
    if (seen.has(href)) continue;
    seen.add(href);
    links.push({
      href,
      label: formationMenuLabel(formation.titre),
      title: formation.titre,
    });
  }

  return links;
}
