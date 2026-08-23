/**
 * 3 liens contextuels en bas des landings métier :
 * pilier `/formations` + 1 page tâche `/ia-*` + 1 département IDF.
 */
import { DEPARTEMENT_PAGES } from '@/lib/departement-pages';
import { getCataloguePilierConnexeDescription } from '@/lib/formation-catalogue-visibility';
import { LINKS } from '@/lib/internal-links';
import { VOIR_AUSSI_DEPT_DEFAUT } from '@/lib/voir-aussi';

export type LienConnexe = {
  href: string;
  label: string;
  description: string;
};

function normPath(path: string): string {
  if (!path || path === '/') return '/';
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  return withSlash.replace(/\/$/, '') || '/';
}

const TACHES: readonly LienConnexe[] = [
  {
    href: LINKS.iaDevis,
    label: 'IA pour devis bâtiment',
    description: 'Chiffrage, notes de visite et devis structurés avec ChatGPT.',
  },
  {
    href: LINKS.iaCompteRenduChantier,
    label: 'Compte rendu de chantier avec l’IA',
    description: 'CR, DOE et PV à partir de notes vocales ou écrites.',
  },
  {
    href: LINKS.iaAnalyseDce,
    label: 'Analyser un DCE avec l’IA',
    description: 'Extraction CCTP, Go / No Go et synthèse d’appel d’offres.',
  },
  {
    href: LINKS.iaMemoireTechnique,
    label: 'Mémoire technique avec l’IA',
    description: 'Structure et rédaction d’un mémoire d’appel d’offres BTP.',
  },
];

function getCataloguePilierLienConnexe(): LienConnexe {
  return {
    href: LINKS.formations,
    label: 'Catalogue des formations IA pour le BTP',
    description: getCataloguePilierConnexeDescription(),
  };
}

function tachePreferee(path: string): LienConnexe {
  const p = normPath(path);
  if (
    /conducteur|chef-chantier|assistante-travaux|canalisateur|geometre|engins|responsable-administratif|assistante-gestion|assistante-administrative/.test(
      p,
    )
  ) {
    return TACHES[1];
  }
  if (/charge-affaires|etancheur|marche-public|gros-oeuvre|dirigeant|construction/.test(p)) {
    return TACHES[2];
  }
  if (/plaquiste|menuisier|charpentier|couvreur/.test(p)) {
    return TACHES[3];
  }
  return TACHES[0];
}

function departementPrefere(path: string): LienConnexe {
  const p = normPath(path);
  const match = DEPARTEMENT_PAGES.find((d) => d.metierPertinent.href === p);
  if (match) {
    return {
      href: match.path,
      label: `Formation IA BTP ${match.nom} (${match.code})`,
      description: `Sessions présentiel — ${match.villes.slice(0, 3).join(', ')}.`,
    };
  }
  return {
    href: VOIR_AUSSI_DEPT_DEFAUT.href,
    label: VOIR_AUSSI_DEPT_DEFAUT.label,
    description: 'Siège OFC à Guyancourt — intra-entreprise, dans vos locaux en Yvelines.',
  };
}

function pickFirstAvailable(
  preferred: LienConnexe,
  pool: readonly LienConnexe[],
  blocked: Set<string>,
): LienConnexe | null {
  if (!blocked.has(normPath(preferred.href))) return preferred;
  return pool.find((item) => !blocked.has(normPath(item.href))) ?? null;
}

/**
 * Trois liens uniques (pilier, tâche, département), hors page courante et hors URLs déjà présentes.
 */
export function getLiensConnexesMetier(
  currentPath: string,
  excludeHrefs: readonly string[] = [],
): LienConnexe[] {
  const blocked = new Set<string>([
    normPath(currentPath),
    ...excludeHrefs.map(normPath),
  ]);

  const deptPool: LienConnexe[] = DEPARTEMENT_PAGES.map((d) => ({
    href: d.path,
    label: `Formation IA BTP ${d.nom} (${d.code})`,
    description: `Sessions présentiel — ${d.villes.slice(0, 3).join(', ')}.`,
  }));

  const pilier = pickFirstAvailable(getCataloguePilierLienConnexe(), [getCataloguePilierLienConnexe()], blocked);
  if (pilier) blocked.add(normPath(pilier.href));

  const tache = pickFirstAvailable(tachePreferee(currentPath), TACHES, blocked);
  if (tache) blocked.add(normPath(tache.href));

  const dept = pickFirstAvailable(departementPrefere(currentPath), deptPool, blocked);

  return [pilier, tache, dept].filter((item): item is LienConnexe => item !== null);
}

export function getLiensConnexesHrefs(
  currentPath: string,
  excludeHrefs: readonly string[] = [],
): string[] {
  return getLiensConnexesMetier(currentPath, excludeHrefs).map((l) => l.href);
}
