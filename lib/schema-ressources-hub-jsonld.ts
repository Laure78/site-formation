/**
 * JSON-LD hub `/ressources` — CollectionPage + ItemList + BreadcrumbList.
 * Ordre ItemList = rubriques de la page (hors hub thématique navigational).
 */
import { LINKS } from '@/lib/internal-links';
import { RESSOURCES_GUIDES } from '@/lib/ressources-guides';
import { RESSOURCES_LEXIQUE } from '@/lib/ressources-lexique';
import { SITE_CONFIG } from '@/lib/seo';
import { TUTOS } from '@/lib/tutos';

const SITE_BASE = SITE_CONFIG.url.replace(/\/$/, '');
const PATH = LINKS.ressources;
const CANONICAL = `${SITE_BASE}${PATH}`;

type ListEntry = {
  name: string;
  url: string;
  description: string;
};

/** Ressources principales dans l’ordre des rubriques de `app/ressources/page.tsx`. */
function buildPrincipalRessourcesList(): ListEntry[] {
  const items: ListEntry[] = [
    {
      name: 'Mes formations LinkedIn Learning',
      url: `${SITE_BASE}${LINKS.formationsLinkedInLearning}`,
      description: '2 formations LinkedIn Learning sur l’IA appliquée au BTP.',
    },
    {
      name: RESSOURCES_LEXIQUE.schemaName,
      url: RESSOURCES_LEXIQUE.url,
      description: RESSOURCES_LEXIQUE.schemaDescription,
    },
    ...RESSOURCES_GUIDES.map((g) => ({
      name: g.title,
      url: `${SITE_BASE}${g.href}`,
      description: g.description,
    })),
    {
      name: 'Bibliothèque skills Claude BTP',
      url: `${SITE_BASE}${LINKS.bibliothequeSkills}`,
      description:
        'Skills métier BTP au format .skill et tutos associés — téléchargement gratuit, sans inscription.',
    },
    ...TUTOS.map((t) => ({
      name: t.title,
      url: `${SITE_BASE}${LINKS.ressources}/${t.slug}`,
      description: t.metaDescription,
    })),
  ];
  return items;
}

/** H1 de la page hub (`RessourcesHero`). */
const HUB_H1 = 'Ressources gratuites IA BTP';

export function buildRessourcesHubJsonLd(): Record<string, unknown> {
  const list = buildPrincipalRessourcesList();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${CANONICAL}#collection`,
        name: HUB_H1,
        description:
          'Tutos PDF, guides et skills Claude pour appliquer l’IA sur appels d’offres, DCE, mémoires techniques et documents de chantier — PME et pros du BTP.',
        url: CANONICAL,
        inLanguage: 'fr-FR',
        isPartOf: { '@type': 'WebSite', name: 'laureolivie.fr', url: SITE_CONFIG.url },
        mainEntity: {
          '@type': 'ItemList',
          '@id': `${CANONICAL}#itemlist`,
          name: 'Ressources principales IA BTP',
          itemListOrder: 'https://schema.org/ItemListOrderAscending',
          numberOfItems: list.length,
          itemListElement: list.map((entry, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'CreativeWork',
              name: entry.name,
              url: entry.url,
              description: entry.description,
            },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${CANONICAL}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: SITE_BASE,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Ressources',
            item: CANONICAL,
          },
        ],
      },
    ],
  };
}
