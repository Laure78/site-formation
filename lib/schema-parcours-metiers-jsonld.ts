/**
 * JSON-LD — hub et fiches parcours métiers 2027 (Course, ItemList — sans prix global ni date de session).
 */
import type { ParcoursComputed } from '@/data/catalogue-2027/parcours';
import { getModuleByCode } from '@/data/catalogue-2027';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import { PARCOURS_SEO_BY_ID } from '@/lib/catalogue-2027/parcours-seo-metadata';
import { buildFormationFicheCourseJsonLd } from '@/lib/schema-formation-course-jsonld';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { LINKS } from '@/lib/internal-links';

function absoluteUrl(path: string): string {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildParcoursMetierCourseJsonLd(parcours: ParcoursComputed): Record<string, unknown> {
  const path = parcoursHref(parcours.id);
  const pack = PARCOURS_SEO_BY_ID[parcours.id];
  return buildFormationFicheCourseJsonLd({
    name: `Parcours ${parcours.titre} — formation IA BTP`,
    description: pack.schemaDescription,
    path,
    timeRequired: `PT${parcours.dureeHeures}H`,
    teaches: [...parcours.competencesVisees].slice(0, 10),
    keywords: pack.keywords,
    instructorName: 'Laure Olivié',
    courseCode: parcours.id,
  });
}

export function buildParcoursModulesItemListJsonLd(parcours: ParcoursComputed): Record<string, unknown> {
  const pageUrl = absoluteUrl(parcoursHref(parcours.id));
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#modules`,
    name: `Modules du parcours ${parcours.titre}`,
    numberOfItems: parcours.etapes.length,
    itemListElement: parcours.etapes.map((etape, index) => {
      const mod = getModuleByCode(etape.moduleCode);
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: mod ? `${mod.code} — ${mod.titre}` : etape.moduleCode,
        description: etape.competence,
      };
    }),
  };
}

export function buildParcoursMetiersHubItemListJsonLd(
  parcours: readonly ParcoursComputed[],
): Record<string, unknown> {
  const pageUrl = absoluteUrl(LINKS.parcoursMetiers);
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#parcours`,
    name: 'Parcours métiers IA pour le BTP',
    numberOfItems: parcours.length,
    itemListElement: parcours.map((p, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: p.titre,
      url: absoluteUrl(parcoursHref(p.id)),
      description: p.benefice,
    })),
  };
}
