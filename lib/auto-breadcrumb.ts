/**
 * Fil d'Ariane automatique à partir du chemin URL (libellés en français).
 */
export type AutoBreadcrumbCrumb = { name: string; path: string };

const EXACT: Record<string, string> = {
  '/formations': 'Formations',
  '/contact': 'Contact',
  '/blog': 'Blog',
  '/a-propos': 'À propos',
  '/prendre-rendez-vous': 'Prendre RDV',
  '/claude-ai-btp': 'Claude AI BTP',
  '/financement-constructys-formation-ia-btp': 'Financement Constructys',
  '/outils-ia-btp': 'Outils IA BTP',
  '/diagnostic-ia-btp': 'Diagnostic IA BTP',
  '/checklist-ia-btp': 'Checklist IA BTP',
  '/communaute-formateurs': 'Communauté formateurs',
  '/ressources/ia-btp': 'Ressources IA BTP',
};

function humanizeSegment(seg: string): string {
  const s = seg.replace(/-/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Retourne les niveaux [Accueil, …] sauf sur la home.
 */
export function autoBreadcrumbFromPathname(pathname: string): AutoBreadcrumbCrumb[] {
  if (!pathname || pathname === '/') return [];

  const items: AutoBreadcrumbCrumb[] = [{ name: 'Accueil', path: '/' }];
  const parts = pathname.split('/').filter(Boolean);

  let acc = '';
  for (let i = 0; i < parts.length; i++) {
    const seg = parts[i];

    if (seg === 'page' && parts[i + 1] && /^\d+$/.test(parts[i + 1])) {
      acc += `/page/${parts[i + 1]}`;
      items.push({ name: `Page ${parts[i + 1]}`, path: acc });
      i += 1;
      continue;
    }

    if (seg === 'categorie' && parts[i + 1]) {
      acc += `/categorie/${parts[i + 1]}`;
      items.push({ name: `Catégorie : ${humanizeSegment(parts[i + 1])}`, path: acc });
      i += 1;
      continue;
    }

    acc += `/${seg}`;

    if (EXACT[acc]) {
      items.push({ name: EXACT[acc], path: acc });
      continue;
    }

    if (parts[0] === 'blog' && i >= 1 && !['page', 'categorie'].includes(parts[1] ?? '')) {
      items.push({ name: 'Article', path: acc });
      continue;
    }

    items.push({ name: humanizeSegment(seg), path: acc });
  }

  return items;
}
