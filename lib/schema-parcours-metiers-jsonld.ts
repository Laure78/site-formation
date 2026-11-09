/**
 * JSON-LD — hub et fiches parcours métiers 2027 (Course, ItemList — tarif = somme modules obligatoires).
 */
import type { ParcoursComputed } from '@/data/catalogue-2027/parcours';
import type { ParcoursId } from '@/data/catalogue-2027';
import { getModuleByCode } from '@/data/catalogue-2027';
import { getParcoursMetierFaqForPage } from '@/lib/catalogue-2027/parcours-metiers-faq-pages';
import { getFAQSchema } from '@/lib/seo';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import { PARCOURS_SEO_BY_ID } from '@/lib/catalogue-2027/parcours-seo-metadata';
import {
  buildFormationFicheCourseJsonLd,
  buildFormationCourseInterOffer,
} from '@/lib/schema-formation-course-jsonld';
import { PARCOURS_TARIF_INTER_CALCULE_MENTION } from '@/lib/catalogue-2027/parcours-affichage';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { LINKS } from '@/lib/internal-links';

function absoluteUrl(path: string): string {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildParcoursMetierCourseJsonLd(parcours: ParcoursComputed): Record<string, unknown> {
  const path = parcoursHref(parcours.id);
  const pack = PARCOURS_SEO_BY_ID[parcours.id];
  const courseUrl = absoluteUrl(path);
  const core = buildFormationFicheCourseJsonLd({
    name: `Parcours ${parcours.titre} — formation IA BTP`,
    description: pack.schemaDescription,
    path,
    timeRequired: `PT${parcours.dureeHeures}H`,
    teaches: [...parcours.competencesVisees].slice(0, 10),
    keywords: pack.keywords,
    instructorName: 'Laure Olivié',
    courseCode: parcours.id,
  });
  return {
    ...core,
    offers: buildFormationCourseInterOffer(
      courseUrl,
      parcours.prixInterHt,
      PARCOURS_TARIF_INTER_CALCULE_MENTION,
    ),
  };
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

/** FAQPage — alignée sur `getFAQSchema` (même logique que fiches catalogue NIV). */
export function buildParcoursMetierFaqPageJsonLd(
  parcoursId: ParcoursId,
  computed?: ParcoursComputed,
): Record<string, unknown> | null {
  return getFAQSchema(getParcoursMetierFaqForPage(parcoursId, computed));
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
